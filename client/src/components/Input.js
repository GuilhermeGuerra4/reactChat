import React from "react";
import PropTypes from 'prop-types';
import {
    TextInput,
    View
} from "react-native";

import {useTheme} from "@react-navigation/native";

export default function Input({placeholder, backgroundColorTheme, style, props}){
    
    const {colors} = useTheme();
    
    const defStyle = {
        width: "100%",
        height: 50,
        paddingLeft: 10,
    }

    return(
        <View>
            <TextInput 
                {...props}
                placeholder={placeholder}
                selectionColor={colors.accent}
                placeholderTextColor={backgroundColorTheme == "light" ? colors.textDark : colors.textDark}
                backgroundColor={backgroundColorTheme == "light" ? colors.borders : colors.primary}
                style={[defStyle, style]} /> 
        </View>
    );
}

Input.propTypes = {

};

Input.defaultProps = {
    style: {},
    placeholder: "",
    backgroundColorTheme: "light",
};