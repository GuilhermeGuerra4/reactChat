import * as React from "react";
import {Text, View, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from "../components/context";
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

export default class App extends React.Component{

	static contextType = AuthContext;

	constructor(props){
		super(props);
		this.state = {
			isSigninInProgress: false,
			userInfo: {},
		};
	}

	componentDidMount(){
		
	}

	render(){

		return(

			<View style={styles.container}>
				<Text style={styles.title}>ReactChat</Text>
				<Text style={styles.subtitle}>Stay connected with your family and friends.</Text>
				<GoogleSigninButton
				    style={styles.signInButton}
				    size={GoogleSigninButton.Size.Wide}
				    color={GoogleSigninButton.Color.Light}
				    onPress={() => {this.context.signIn()}}
				    disabled={this.state.isSigninInProgress} />
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0099ff",
	},
	title: {
		fontSize: 35,
		marginBottom: 5,
		fontWeight: "bold",
		color: "#fff",
	},
	subtitle: {
		fontSize: 14,
		marginBottom: 30,
		color: "#fff",
	},
	signInButton: {
		width: "70%",
		height: 60,
	},
});