import React, {Component} from "react";
import {View, Text} from "react-native";
import firebase from "../database/firebase";


export default class App extends Component{

	constructor(props){
		super(props);
	
		this.state = {

		};

		try{
			firebase.firestore().collection("messages").onSnapshot((a) => {
				a.forEach(doc => {
					//console.log(doc.data());
				});
			});
		}
		catch(e){
			console.log(e);
		}
	}

	render(){
		return(
				<View>
					<Text>Hey</Text>
				</View>
			)
	}
}