import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableNativeFeedback} from "react-native";

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
              msgs: [...this.state.msgs, ...[{title: this.state.input, isRight: true}]],
              input: "",
            }
        );
    }
  } 

  render(){
    return (
        <View style={{flex: 1}}>
            
          <View style={styles.header}></View>

          <ScrollView style={styles.msgs}
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          >
            <View style={{marginBottom: 15}}></View>
            {this.state.msgs.map((item, index) => (

                <View style={item.isRight ? styles.right : styles.left }>
                    <Text style={item.isRight ? {color: "#fff"} : {}}>{item.title}</Text>
                </View>

            ))}

          </ScrollView>

          <View style={styles.in}>
            <TextInput 
              value={this.state.input} 
              onChangeText={(value) => {this.setState({input: value})}} 
              onFocus={this.scrollView.scrollToEnd({animated: true})}
              multiline style={styles.on} 
              placeholder={"Mensagem"} />
            
              <TouchableNativeFeedback onPress={this.addMsg.bind(this)}>
                <View style={styles.btc}>
                   <Text>Enviar</Text>
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
    height: 50,
    backgroundColor: "#fff",
    elevation: 50,
    marginBottom: 0,
  },
  msgs: {
    flex: 1,
    marginBottom: 50,
    paddingBottom: 50,
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
    position: "absolute",
    width: "100%",
    height:"auto",
    backgroundColor: "#fff",
    elevation: 10,
    bottom: 0,
    zIndex: 2,
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
  }
});