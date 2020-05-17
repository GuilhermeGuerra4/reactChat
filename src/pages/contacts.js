import React, {Component, useEffect, useState} from "react";
import {View, Text, FlatList, TouchableOpacity, YellowBox, StyleSheet} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';


import io from "socket.io-client";

import Header from "../components/header";
import ChatItem from "../components/chat-item";


import {AuthContext} from "../components/context";

export default class App extends Component{

	static contextType = AuthContext;

	constructor(props){
		super(props);
		

		this.state = {
			index: 0,
			messages: [
				{date: {_nanoseconds: 0, _seconds: 1589410802}, from: {email: "guilhermeguerra12345@gmail.com", id: "108525094048443059463", name: "Guilherme Guerra", photo: "https://lh5.googleusercontent.com/-_lfhI9K7C5Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck9TuHqC3-WixlILvlxCV8_QF61oA/s96-c/photo.jpg"}, message: "hey boi", status: "sent", to: "guilhermeguerra12345@gmail.com"}
				,{date: {_nanoseconds: 0, _seconds: 1589410803}, from: {email: "guilhermeguerra12345@gmail.com", id: "108525094048443059463", name: "Guilherme Guerra", photo: "https://lh5.googleusercontent.com/-_lfhI9K7C5Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck9TuHqC3-WixlILvlxCV8_QF61oA/s96-c/photo.jpg"}, message: "hey boi", status: "sent", to: "guilhermeguerra12345@gmail.com"}
			],
		};

		console.ignoredYellowBox = ['Remote debugger'];
		YellowBox.ignoreWarnings([
		    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
		]);
	}

	componentDidMount(){
		
		this.socket = io("http://127.0.0.1:3000", {
			timeout: 3000,
			pingTimeout: 3000,
			transports: ['websocket'],	
			jsonp: false,
			agent: '-',
			pfx: '-',
			cert: '-',
			ca: '-',
			ciphers: '-',
			rejectUnauthorized: '-',
			perMessageDeflate: '-' 
		});


		this.socket.on("connect", msg => {

			console.log("connected");

			const handShake = async () => {
				await AsyncStorage.multiGet(["id", "photo", "email", "name"], (error, response) => {
					const data = {};
				
					response.forEach(item => {
						data[item[0]] = item[1];
					});

					this.socket.emit("signedUpVerify", JSON.stringify(data));
				});
			}

			handShake();

	    	
	    });

	    this.socket.on("teste", msg => {
	    	//alert(msg);
	    });

	}

	componentWillUnmount(){
	}

	contacts(item){
		return(<ChatItem navigation={this.props.navigation} data={item}/>)
	}

	generateKey(item){
		return item.date._seconds.toString()+item.from.id.toString()+item.to.toString();
	}

	console(){
		this.socket.emit("teste", "haha");
	}

	render(){
		return(


				<View style={styles.mainContainer}>

					<Header console={this.console.bind(this)} navigation={this.props.navigation}/>		

					{
						this.state.messages.length > 0 ? (
						
					<FlatList 
						data={this.state.messages}
						keyExtractor={(item) => {return this.generateKey(item)}}
						renderItem={(item) => this.contacts(item)}/>

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
	}
});