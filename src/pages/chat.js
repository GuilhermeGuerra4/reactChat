import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableNativeFeedback, Keyboard, TouchableOpacity} from "react-native";

export default class App extends Component{
  
  constructor(props){
    super(props);

    this.state = {
      msgs: [
        {title: "oi", "isRight": false},
        {title: "como vai?", isRight: false},
        {title: "como vai?", isRight: false},
        {title: "como vai?", isRight: false},
        {title: "como vai?", isRight: false},
        {title: "como vai?", isRight: false},
      ],

      input: "",
      
    };

  }

  addMsg(){

    if(this.state.input.trim() != ""){
      this.setState(
            {
              msgs: [...this.state.msgs, ...[{title: this.state.input, isRight: true}, {title: "vai se fuder", isRight: false}]],
              input: "",
            }
        );
    }
  } 

  scrollBottom(){
      this.scroll.scrollToEnd();
  }

  componentDidMount(){
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.scrollBottom.bind(this));
  }

  componentWillUnmount(){
        this.keyboardDidShowListener.remove();
  }

  render(){
    return (
        <View style={{flex: 1}}>
            
          <View style={styles.header}></View>

          <ScrollView style={styles.msgs}
            ref={ref => {this.scroll = ref}}
            onContentSizeChange={() => this.scroll.scrollToEnd({animated: true})}
          >
            <View style={{marginBottom: 15}}></View>
            {this.state.msgs.map((item, index) => (

                <TouchableOpacity>
                  <View style={item.isRight ? styles.right : styles.left }>
                      <Text style={item.isRight ? {color: "#fff"} : {}}>{item.title}</Text>
                  </View>
                </TouchableOpacity>

            ))}

          </ScrollView>

          <View style={styles.in}>
            <TextInput 
              value={this.state.input} 
              onChangeText={(value) => {this.setState({input: value})}} 
              multiline style={styles.on} 
              placeholder={"Mensagem"} />
            
             
                <View style={styles.btc}>
                   <TouchableNativeFeedback onPress={this.addMsg.bind(this)}>
                      <Text>Enviar</Text>
                    </TouchableNativeFeedback>
                </View>
              
            </View>
        
        </View>
      )
  }
}


const styles = StyleSheet.create({  
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    elevation: 2,
    marginBottom: 0,
  },
  msgs: {
    height: "auto",
  },
  left: {
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginBottom: 5,
    flex: 0,
    maxWidth: "70%",
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
    borderRadius: 50 / 2,
  },
  right: {
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 20,
    marginTop: 0,
    marginBottom: 5,
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
    borderRadius: 100 / 2,
  }
});