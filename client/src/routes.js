import * as React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from "./pages/chat";
import SignInScreen from "./pages/signIn";
import ContactsScreen from "./pages/contacts";
import ConfigsScreen from "./pages/configs";
import AddContactScreen from "./pages/addContact";

import {DefaultTransition} from "./animations/defaultTransition";

import {View, Text, Animated} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from "./components/context";
import httpsRequest from "./functions/httpRequest";

import { TransitionPresets, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App(){
	
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

	const verifyLogin = async () => {
		await AsyncStorage.getItem("idToken").then((idToken) => {
			if(idToken != null){
				dispatch({type: "SIGN_IN", idToken: idToken});
			}
			else{
				dispatch({type: "SIGN_OUT"});
			}
		});
	}

	verifyLogin();

	const Auth = React.useMemo(() => ({
		
		signIn: async () => {
			try{
				let hasPlayServices = await GoogleSignin.hasPlayServices();

				if(!hasPlayServices){
					alert("No Play Services")
				}

				const userInfo = await GoogleSignin.signIn();

				const data = [
					["idToken", userInfo.idToken],
					["id", userInfo.user.id],
					["email", userInfo.user.email],
					["photo", userInfo.user.photo],
					["name", userInfo.user.name],
				];

				await httpsRequest.post('/get_token', 'token='+userInfo.idToken+'&email='+userInfo.user.email).then((res) => {
					data.push(["token", res.data.token]);

					const save = async (data) => {
						await AsyncStorage.multiSet(data, () => {
							dispatch({type: "SIGN_IN", idToken: userInfo.idToken});	
						});
					}

					save(data);

				}, {'Content-Type': 'application/x-www-form-urlencoded',});
			}
			catch(error){
				console.log(error);
			}
			
			
		},

		signOut: async () => {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			const keys = await AsyncStorage.getAllKeys();
        	await AsyncStorage.multiRemove(keys);
	        dispatch({type: "SIGN_OUT"});
		},

	}), []);

	if(state.isLoading){
		return(<View></View>);
	}

	

	const options = {
		headerShown: false,
 		...DefaultTransition,
	};

	return(
		<AuthContext.Provider value={Auth}>
			<NavigationContainer>
				
					<Stack.Navigator
						screenOptions={options}>
						
						{

							state.isSigned == true ? (
							
							<>
								<Stack.Screen 
									name="Contacts" 
									component={ContactsScreen}/>

								<Stack.Screen
									name="Configs"
									component={ConfigsScreen}/>

								<Stack.Screen 
									name="Chat" 

									component={ChatScreen}/>

								<Stack.Screen 
									name="AddContact" 

									component={AddContactScreen}/>
							</>


							
							) : (		
							<Stack.Screen 
								name="SignIn" 
								component={SignInScreen}/>
							)
						}

					</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
		);
}
