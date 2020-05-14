import * as React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from "./pages/chat";
import SignInScreen from "./pages/signIn";
import ContactsScreen from "./pages/contacts";

import {View, Text} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from "./components/context";

import {GoogleSignin,GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';


const Stack = createStackNavigator();


GoogleSignin.configure({
	webClientId: '797686492314-eo7d48gt3lmceqem9n7qbg9q39sbd3cm.apps.googleusercontent.com',
	offlineAccess: true, 
	forceCodeForRefreshToken: true,
});


export default function App(){

	const options = {
		headerShown: false,
	};

	
	const [state, dispatch] = React.useReducer(
		
		(prevState, action) => {
			switch(action.type){
				case "SIGN_IN":
					return {isLoading: false, userToken: action.idToken, isSigned: true}
				case "SIGN_OUT":
					return {isSigned: false}
				default:
					return state;
			}
		}

	,{
		isLoading: true,
		userToken: null,
		isSigned: false,
	});


	React.useEffect(() => {

		const verifyLogin = async () => {
			await AsyncStorage.getItem("idToken").then((idToken) => {
				if(idToken != null){
					dispatch({type: "SIGN_IN", idToken: idToken});
				}
			});
		}

		verifyLogin();
	});


	const Auth = React.useMemo(() => ({
		
		signIn: async () => {

			try{
				await GoogleSignin.hasPlayServices();
				const userInfo = await GoogleSignin.signIn();
				
				await AsyncStorage.setItem("idToken", userInfo.idToken, () => {
					dispatch({type: "SIGN_IN", idToken: userInfo.idToken});
				});
			}
			catch(error){
				console.log(error);
			}
			
			
		},

		signOut: async () => {
			await AsyncStorage.removeItem("idToken").then(() => {
				dispatch({type: "SIGN_OUT"});
			});
		},

	}), []);

	if(state.isLoading){
		return(<View><Text>Loading</Text></View>);
	}



	return(
		<AuthContext.Provider value={Auth}>
			<NavigationContainer>
				
					<Stack.Navigator
						screenOptions={options}>
						
						{

							state.isSigned == true ? (
							
							<Stack.Screen 
								name="Contacts" 
								component={ContactsScreen}/>
							
							) : (

							<Stack.Screen 
								name="SignIn" 
								component={SignInScreen}/>

							)
							
						}

						<Stack.Screen 
								name="Chat" 
								component={ChatScreen}/>


					</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
		);

}
