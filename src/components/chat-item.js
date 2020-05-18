import React, {Component} from "react";
import {Text, View, StyleSheet, Image, TouchableNativeFeedback} from "react-native";

export default class ChatItem extends Component{

	constructor(props){
		super(props);
		this.data = this.props.data.item;
		this.hasMessage = true;
	}

	componentDidMount(){

	}

	goToChat(){
		this.props.navigation.navigate("Chat");
	}

	render(){
		return(
				<TouchableNativeFeedback onPress={() => {this.goToChat()}}>
					<View style={styles.container}>
						<Image style={styles.image} source={{uri: this.data.from.photo}}/>
						<View style={styles.texts}>
							<Text style={styles.name}>{this.data.from.name}</Text>
							<Text style={styles.preview}>i sent you this message because...</Text>
						</View>
						<View style={this.hasMessage ? styles.msgs : {}}></View> 
					</View>
				</TouchableNativeFeedback>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingTop: 3,
		paddingBottom: 3,
		borderBottomColor: "#f1f1f1",
		borderBottomWidth: 1,
		elevation: 2,
		backgroundColor: "#fff",
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 45,
		height: 45,
		margin: 8,
		borderRadius: 100 / 2,
	},
	name: {
		fontSize: 17,
	},

	texts: {
		flexDirection: "column",
	},

	msgs:{
		position: "absolute",
		right: 20,
		padding: 5,
		borderRadius: 100 / 2,
		backgroundColor: "#ff0000",
	}
});