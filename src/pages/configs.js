import React, {Component} from "react";
import {View, Text, FlatList, TouchableNativeFeedback, StyleSheet} from "react-native";

import {AuthContext} from "../components/context";



export default class App extends Component{

	static contextType = AuthContext;

	constructor(props){
		super(props);
	}

	componentDidMount(){

	}

	componentWillUnmount(){

	}

	signOut(){
		alert("SIGNOUT");
		console.log(this.context);
		this.context.signOut();
	}

	render(){
		return(
				<View style={styles.container}>
					<TouchableNativeFeedback onPress={() => {this.signOut()}}>
						<View  style={styles.btc}>
							<Text style={styles.btcText}>SignOut</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			)
	}
}


const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	btc: {
		backgroundColor: "#0088FF",
	},
	btcText: {
		fontSize: 20,
		color: "#fff",
		padding: 15,
		paddingLeft: 25,
		paddingRight: 25,
	}
});