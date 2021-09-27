import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import {spacing, fonts} from "@app/theme";

import Touchable from "@app/components/Touchable";

export default function Contact({user, lastMessage, props}){

    const {colors} = useTheme();
    
    const borderColor = {
        borderBottomColor: colors.border,
        borderTopColor: colors.border
    };

    const [isImageOpened, setIsImageOpened] = useState(false);
    
    function handlePictureTouch(){
        setIsImageOpened(true);
    }

    function handleContactTouch(){}

    return(
        <>
            <TouchableOpacity onPress={handleContactTouch}>
                <View style={[styles.container, borderColor]}>
                    <View onPress={handlePictureTouch}>
                        <Image 
                            width={100}
                            height={100}
                            style={[styles.image, {borderColor: colors.borders}]}
                            source={user?.image != null ? {uri: user.image} : null}/>
                    </View>
                    <View>
                        <Text style={[styles.username, fonts.l, {color: colors.text}]}>{user?.name}</Text>
                        {lastMessage ? <Text style={[styles.username, fonts.m, {color: colors.text}]}>{lastMessage}</Text> : null}
                    </View>
                    <View style={styles.redDot}></View>
                </View>
            </TouchableOpacity>
        </>
    );
}

Contact.defaultProps = {
    user: {
        name: null,
        image: null,
    },
    lastMessage: null,
}; 

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        minHeight: 60,
        backgroundColor: "#fff",
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 55,
        height: 55,
        margin: spacing.xs,
        borderRadius: 100,
        marginRight: spacing.s,
        borderWidth: 0.5,
        backgroundColor: "#fafafa"
    },
    username: {},
    redDot: {
        position: "absolute",
        backgroundColor: "#ff0000",
        width: 8,
        height: 8,
        borderRadius: 100,
        right: "5%",
    },
    imageAmplifiedView: {
        position: "absolute",
        zIndex: 3,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0006",
    },
    imageAmplified: {
        width: "80%",
        aspectRatio: 1,
        borderRadius: 4,
    }
});