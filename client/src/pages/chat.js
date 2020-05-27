import React, {Component} from "react";
import {Text, Image, View, StyleSheet, FlatList, TextInput, ActivityIndicator, TouchableNativeFeedback, Keyboard, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from "../components/context";
import Socket from "../functions/socket";
import httpsRequest from "../functions/httpRequest";
import uuid from "react-native-uuid";

export default class App extends Component{
  
  static contextType = AuthContext;

    constructor(props){
    super(props);


    this.email = props.route.params.email;
    this.photo = props.route.params.photo;
    this.name = props.route.params.name;

    const getToken = async () => {
      await AsyncStorage.getItem("token").then((token) => {
        this.token = token;
      });
    }

    getToken();

    this.state = {
      msgs: [
      ],

      input: "",

      isLoading: true,

      status: " ",
      
    };
  }

  addMsg(){
   console.log(this.scroll);
   this.scrollBottom();
   if(this.state.input.trim() != ""){
   this.conn.sendMessage(this.token, this.state.input, this.email);
   this.setState(
         {
           msgs: [{title: this.state.input, isRight: true}, ...this.state.msgs],
           input: "",
         }
     );
   }
  } 

  async load(token){
    try{
      await httpsRequest.post('/get_messages_chat', 'token='+token+'&email='+this.email).then((res) => {

        if(res.data.messages.length != 0){
          this.setState({msgs: [...this.state.msgs, ...res.data.messages.reverse()], isLoading: false})
        }
        else{
          this.setState({isLoading: false})
        }


      }, {'Content-Type': 'application/x-www-form-urlencoded',});
    }
    catch(error){
      console.log(error);
    }
  }

  scrollBottom(){
      this.scroll.scrollToOffset({animated: false, offset: 0});
  }

  stateHandler(new_message){
    this.conn.updateReaded(this.email);
    if(this.email == new_message.from.email){
      this.setState({msgs: [{title: new_message.message, isRight: false}, ...this.state.msgs]});
    }
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }


  status(response){
    let now = Math.floor(Date.now() / 1000)
    let last = parseFloat(response.lastTimeOnline);
    let up = now - last;
    let timer = '';
    if(up > 20){
      if(up < 60){
        timer = 'An minute ago';
      }
      else if(up < 60 * 60){
        timer = Math.round(up / 60) + ' min ago';
      }
      else if(up > 60 * 60 && up < 60 * 60 * 24){
        const hour = Math.round(up / 60 / 60);
        if(hour > 1){
          timer = hour+' hours ago';
        } 
        else{
          timer = 'An hour ago';
        }
      }
      else{
        timer = this.timeConverter(last);
      }

      this.setState({status: 'Last time: '+timer});  
    }
    else{
      this.setState({status: 'Online'});
    }
  }

  componentDidMount(){
    const connect = async () => {
      await AsyncStorage.getItem("token").then((token) => {
        this.load(token);
        this.conn = new Socket();
        this.conn.connect(token, this.stateHandler.bind(this), this.status.bind(this));
        this.conn.getStatus(this.email);
        this.conn.updateReaded(this.email);
        this.timer = setInterval(async () => {
          this.conn.getStatus(this.email);
        }, 5000);

      })
    }

    connect();  
  }

  componentWillUnmount(){
      clearInterval(this.timer);
  }

  generateKey(item){
    return uuid.v1();
  }

  renderItem(item){
    item = item.item;
    return(
    <TouchableOpacity style={item.isRight ? styles.right : styles.left}>
      <Text style={item.isRight ? {color: "#fff"} : {}}>{item.title}</Text>
    </TouchableOpacity>
    )
  }

  FlatListEmpty(){
    return(
        <ActivityIndicator color={"#0088ff"} size={45}/>
      )
  }

  async logout(){
   
    try{
        alert("SIGN-OUT");
        this.context.signOut();  
    }
    catch(e){
      console.log(e);
    }
  }

  render(){
    return (
        <View style={{flex: 1}}>
            
         <View style={styles.header}>
            <Image style={styles.image} source={{uri: this.photo}}/>
            <View style={styles.align}>   
               <Text style={styles.title}>{this.name}</Text>
               <Text style={styles.status}>{this.state.status}</Text>
            </View>
         </View>
            
         <FlatList style={styles.msgs}
            ref={ref => {this.scroll = ref}}
            data={this.state.msgs}
            keyExtractor={(item) => {return this.generateKey(item)}}
            renderItem={(item) => this.renderItem(item)}
            initalNumToRender={30}
            inverted={-1}
            ListEmptyComponent={this.FlatListEmpty()}
            ListHeaderComponent={<Text style={styles.ReadedStatus}>{this.state.hasSeen ? "Seen" : ""}</Text>}
            ListFooterComponent={<View style={{ height: 0, marginBottom: 30 }}></View>}
         />
      

         <View style={styles.in}>
            <TextInput 
              value={this.state.input} 
              onChangeText={(value) => {this.setState({input: value})}} 
              multiline style={styles.on} 
              placeholder={"Message"} />
            
              <TouchableNativeFeedback onPress={this.addMsg.bind(this)}>
              <View style={styles.btc}>
                    <Text>Send</Text>    
              </View>
            </TouchableNativeFeedback>
         </View>
        
        </View>
      )
  }
}


const styles = StyleSheet.create({  
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    elevation: 2,
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  status: {

  },
  align:{

  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 45,
    height: 45,
    margin: 8,
    borderRadius: 100 / 2,
  },
  msgs: {
    height: "auto",
    flex: 1,
    paddingTop: 10,
  },
  left: {
    marginLeft: 15,
    marginTop: 5,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    maxWidth: "70%",
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
    borderRadius: 50 / 2,
  },
  right: {
    marginRight: 15,
    marginTop: 5,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    maxWidth: "70%",
    backgroundColor: "#00aaFF",
    borderRadius: 50 / 2,
    alignSelf: "flex-end",
  },


  in: {
    backgroundColor: "red",
    width: "100%",
    height:"auto",
    maxHeight: 80,
    backgroundColor: "#fff",
    elevation: 10,
    fontSize: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  on: {
      alignSelf: "flex-start",
      width: "75%",
      minHeight: 50, //... For dynamic height
      maxHeight: 80,
      paddingLeft: 10,
      paddingTop: 10, 
      paddingBottom: 10,
  },

  btc: {
    width: 80,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ReadedStatus: {
   alignSelf: "flex-end",
   marginTop: 10,
   marginRight: 25,
   color: "#888",
  },
  loading: {

  },
});