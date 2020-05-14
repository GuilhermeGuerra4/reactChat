import * as React from "react";
import {Text, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from "../components/context";
import {GoogleSigninButton} from "@react-native-community/google-signin";

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

			<View>
				<Text>Hello</Text>
				<GoogleSigninButton
				    style={{ width: 192, height: 48 }}
				    size={GoogleSigninButton.Size.Wide}
				    color={GoogleSigninButton.Color.Dark}
				    onPress={() => {this.context.signIn()}}
				    disabled={this.state.isSigninInProgress} />
			</View>
		)
	}
}