import React, {Component} from "react";
import {View, Text, Image, StyleSheet, TextInput, TouchableNativeFeedback} from "react-native";
import httpsRequest from "../functions/httpRequest";


export default class App extends Component{
	constructor(props){
		super(props);

		this.state = {
			handlerInput: "",
			response: "",
		}
	}

	componentDidMount(){}

	async add(){
		await httpsRequest.post('/get_user', 'email='+this.state.handlerInput).then((res) => {
			if(res.data.status == true){
				let photo = res.data.userdata.photo;
				let name = res.data.userdata.name;
				let email = res.data.userdata.email;
				this.props.navigation.navigate("Chat", {photo: photo, name: name, email: email});
			}
			else{
				this.setState({response: 'User not found'});
			}
		}, {'Content-Type': 'application/x-www-form-urlencoded',});
	}

	render(){
		return(

		<View style={styles.container}>
			
			<Text style={styles.title}>Add contact</Text>
			
			<TextInput 
				style={styles.input}
				placeholder="Email"
				value={this.state.handlerInput} 
              	onChangeText={(value) => {this.setState({handlerInput: value})}}/>

			<TouchableNativeFeedback onPress={() => {this.add()}}>
				<View style={styles.btc}>
					<Text style={styles.text}>Search</Text>
				</View>
			</TouchableNativeFeedback>

			<Text style={styles.response}>{this.state.response}</Text>

		</View>)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 20,
		marginBottom: 30,
	},
	input: {
		width: "80%",
		padding: 10,
		backgroundColor: "#f5f5f5",
	},
	btc: {
		padding: 11,
		marginTop: 10,
		width: "80%",
		alignItems: "center",
		backgroundColor: "#0099ff",
	},
	text: {
		color: "#fff",
		fontSize: 16,
	},
	response: {
		marginTop: 10,
		fontSize: 14,
		color: "#ff2222",
	},
});