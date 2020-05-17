import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, StatusBar} from "react-native";

const settingsIcon = require("../assets/imgs/settings_white.png");

export default class Header extends Component{
	
	constructor(props){
		super(props);
	}

	componentWillUnmount(){

	}

	componentDidMount(){}


	render(){
		return(

			<View style={styles.container}>
				<StatusBar backgroundColor="#0081ff"/>
				<Text style={styles.title}>ReactChat</Text>
				<TouchableOpacity style={styles.icon} onPress={() => {this.props.console()}}>
					<Image style={styles.icon} source={settingsIcon}/>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 55,
		backgroundColor: "#0099ff",
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		elevation: 5,
	},
	title: {
		fontSize: 19,
		paddingLeft: 25,
		fontWeight: "bold",
		color: "#fff",
	},
	icon: {
		width: 32,
		height: 32,
		position: "absolute",
		right: 5,
	}
});