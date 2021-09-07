import React from "react";
import RootNavigator from "./navigation";
import {NavigationContainer} from "react-navigation/native";

export function App(){
	return(
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}