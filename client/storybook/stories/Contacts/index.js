import React from "react";
import {View, useColorScheme} from "react-native";
import ContactsScreen from "@app/screens/Contacts/Contacts";
import {theme} from "@app/theme/theme";
import { NavigationContainer } from '@react-navigation/native';

export default function Contacts(){

    const scheme = useColorScheme();

    return(
        <NavigationContainer theme={theme[scheme]}>
            <ContactsScreen/>
        </NavigationContainer>
    );
}
