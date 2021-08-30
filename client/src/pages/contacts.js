import React, {Component, useEffect, useState} from "react";
import {View, Text, FlatList, TouchableOpacity, TouchableNativeFeedback, ActivityIndicator, YellowBox, StyleSheet} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from "../components/header";
import ChatItem from "../components/chat-item";


import {AuthContext} from "../components/context";
import Socket from "../functions/socket";

import uuid from "react-native-uuid";
import httpsRequest from "../functions/httpRequest";

export default class App extends Component{

	static contextType = AuthContext;

	constructor(props){
		super(props);
		
		this.state = {
			teste: null,
			index: 0,
			updated: false,
			isLoading: true,
			messages: [],
		};

		console.ignoredYellowBox = ['Remote debugger'];
		YellowBox.ignoreWarnings([
		    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
		]);
	}

	update(){
		this.setState({isLoading: true,messages: []}, () => {
			this.add(this.token);
		});
	}

	add(token){
		try{
			httpsRequest.post('/get_messages', 'token='+token+'&limit=10&page=1').then((res) => {
				
				const payload = res.data;
				
				if(payload.status == true){
					if(payload.messages.length > 0){
						this.setState({messages: [...payload.messages, ...this.state.messages], isLoading: false})
					}
					else{
						this.setState({isLoading: false});
					}
				}
				
			}, {'Content-Type': 'application/x-www-form-urlencoded',});
		}
		catch(error){
			console.log(error);
		}
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
				this.token = token;
				this.add(token);
				this.conn = new Socket();
				this.conn.connect(token, this.stateHandler.bind(this));
			})
		}
		connect();
	
		this.screenOnFocus = this.props.navigation.addListener('focus', () => {
			this.update();
		});

	}

	componentWillUnmount(){
		this.screenOnFocus();
	}

	contacts(item){
		return(<ChatItem navigation={this.props.navigation} data={item}/>)
	}

	generateKey(item){
		return(uuid.v1());
	}

	render(){
		return(
				<View style={styles.mainContainer}>

					<TouchableNativeFeedback 
						onPress={() => {this.props.navigation.navigate('AddContact')}}
						useForeground={true}
						background={TouchableNativeFeedback.Ripple('#ccc', true)}
						>
						<View style={styles.floatButton}>
							<Text style={styles.btctxt}>+</Text>
						</View>
					</TouchableNativeFeedback>

					<Header signout={() => {this.context.signOut()}}/>		

					{
						this.state.isLoading == false ? (
					<View>

					<FlatList 
						data={this.state.messages}
						keyExtractor={(item) => {return this.generateKey(item)}}
						renderItem={(item) => this.contacts(item)}/>
						
					</View>

					) : (

					
					<View>
						<ActivityIndicator size={40} color={"#0088ff"} style={styles.loading}/>
					</View>
						

					)}


				{this.state.isLoading == false && this.state.messages.length == 0 ? 

					(<Text style={styles.none}>None messages yet</Text>) : 

					(<View></View>)}


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
	},
	floatButton: {
		position: "absolute",
		backgroundColor: "#fff",
		width: 60,
		height: 60,
		elevation: 10,
		borderRadius: 40,
		bottom: 50,
		right: 30,
		alignItems: "center",
	},
	btctxt: {
		fontSize: 40,
		color: "#333",
		textAlign: "center",
	},
	loading:{
		marginTop: 30,
		alignSelf:"center",
	},
	none: {
		textAlign: "center",
		marginTop: 30,
		fontSize: 20,
		color: "#444",
	}
});