import React from "react";
import PropTypes from 'prop-types';
import {
    TouchableOpacity,
    View
} from "react-native";

export default function Touchable({onPress, padding, size, children, showPadding, ...props}){

    const style = {
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: showPadding ? "red" : "transparent",
    }

    return(
        <View {...props}>
            <TouchableOpacity 
                style={style}
                onPress={onPress}>
                {children}
            </TouchableOpacity>
        </View>
    );
}

Touchable.propTypes = {
    padding: PropTypes.number,
}

Touchable.defaultProps = {
    padding: 0,
    showPadding: false,
};