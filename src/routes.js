import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from "./pages/chat";
import SignInScreen from "./pages/signIn";
import {View, Text} from "react-native";

const Stack = createStackNavigator();
const isSigned = false;

const options = {
	headerShown: false,
};

export default function App(){


	return(
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={options}>
					
					{

						isSigned == true ? (
						
						<Stack.Screen 
							name="Chat" 
							component={ChatScreen}/>
						
						) : (

						<Stack.Screen 
							name="SignIn" 
							component={SignInScreen}/>

						)
						
					}


				</Stack.Navigator>
			</NavigationContainer>
		);
}
