import React from "react";
import { 
    View,
    Text,
    SafeAreaView,
    StatusBar,
 } from "react-native";


import Header from "@app/components/Header";
import styles from "@app/screens/Contacts/Contacts.styles";

export default function ContactsScreen(){
    return(
        <SafeAreaView>
            <StatusBar 
                barStyle={"dark-content"}
                backgroundColor={"#fff"}
            />
            <Header />
        </SafeAreaView>
    );
}