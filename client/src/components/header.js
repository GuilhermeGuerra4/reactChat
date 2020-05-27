import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, UIManager} from "react-native";
import PopupMenu from "./popup";
export default class Header extends Component{
	
	constructor(props){
		super(props);
	}

	componentWillUnmount(){

	}

	componentDidMount(){}

	onPopupEvent = (eventName, index) => {
    if (eventName !== 'itemSelected') return
    if (index === 0) this.props.signout();
    else this.onRemove()
  }

	render(){
		return(

			<View style={styles.container}>
				<StatusBar backgroundColor="#0081ff"/>
				<Text style={styles.title}>ReactChat</Text>
				<View style={styles.icon}>
					<PopupMenu actions={['Logout']}  onPress={this.onPopupEvent}/>
				</View>
			</View>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 55,
		backgroundColor: "#0099ff",
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		elevation: 5,
	},
	title: {
		fontSize: 19,
		paddingLeft: 25,
		fontWeight: "bold",
		color: "#fff",
	},
	icon: {
		width: 60,
		height: "100%",
		position: "absolute",
		right: 0,
		justifyContent: "center",
	},

});