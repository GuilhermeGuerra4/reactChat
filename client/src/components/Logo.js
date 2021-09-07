import React from "react";
import PropTypes from 'prop-types';
import SvgImageLogo from "@app/assets/images/logo";
import {
    View,
} from "react-native";

export default function Logo({width, height, ...props}){

    const size = {
        width: width,
        height: height
    }

    return(
        <View style={size} {...props}>
            <SvgImageLogo 
                width={width}
                height={height} />
        </View>
    );
}

Logo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
}

Logo.defaultProps = {
    width: 40,
    height: 50,
};