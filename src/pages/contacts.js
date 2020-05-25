import React, {Component, useEffect, useState} from "react";
import {View, Text, FlatList, TouchableOpacity, YellowBox, StyleSheet} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import Header from "../components/header";
import ChatItem from "../components/chat-item";


import {AuthContext} from "../components/context";
import Socket from "../functions/socket";


export default class App extends Component{

	static contextType = AuthContext;

	constructor(props){
		super(props);
		
		this.state = {
			teste: null,
			index: 0,
			updated: false,
			messages: [
				{"from": {"email": "seutrocooficial@gmail.com", "name": "Seutroco Oficial", "photo": "https://lh3.googleusercontent.com/a-/AOh14GiTwMq5Yr91x8bLcnuoXE5hlBkQrvCH6v1mpGUQ=s96-c"}, "message": "first", "timestamp": 1590438206.3876874}
			],
		};

		console.ignoredYellowBox = ['Remote debugger'];
		YellowBox.ignoreWarnings([
		    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
		]);
	}

	stateHandler(new_message){
		let isNew = true;
		let itemIndex;
		let newArray = this.state.messages;

		for(i = 0; i<this.state.messages.length;i++){
			if(this.state.messages[i].from.email == new_message.from.email){
				isNew = false;
				itemIndex = i;
			}
		}

		if(isNew == true){
			this.setState({messages: [new_message, ...this.state.messages]});
		}
		else{
			newArray[itemIndex] = new_message;
			
			let temp = newArray[itemIndex];

			for(i=itemIndex;i>0;i--){
				newArray[i] = newArray[i-1];
			}

			newArray[0] = temp;
			this.setState({messages: newArray});
		}
	}

	componentDidMount(){
		const connect = async () => {
			await AsyncStorage.getItem("token").then((token) => {
				this.conn = new Socket();
				this.conn.connect(token, this.stateHandler.bind(this));
			})
		}

		connect();
	}

	componentWillUnmount(){
	}

	contacts(item){
		return(<ChatItem navigation={this.props.navigation} data={item}/>)
	}

	generateKey(item){
		return(item.timestamp.toString()+item.from.email.toString());
	}

	render(){
		return(
				<View style={styles.mainContainer}>

					<Header/>		

					{
						this.state.messages.length > 0 ? (
					<View>	
					<FlatList 
						data={this.state.messages}
						keyExtractor={(item) => {return this.generateKey(item)}}
						renderItem={(item) => this.contacts(item)}/>
					</View>

					) : (

						<View>
							<Text style={{alignSelf: "center", marginTop: 30,fontSize: 19,color: "#777"}}>None message yet</Text>
						</View>)
					}

				</View>
			)
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#fff",
	},
	signout: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "red",
		alignSelf: "center",
	}
});