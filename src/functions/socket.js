import React, {Component} from "react";
import io from "socket.io-client";

export default class Socket{
	
	constructor(){
		this.serverUri = "http://localhost:3000";
	}

	add(res){
		this.handler(res);
	}

	connect(token, handler){
		
		this.token = token;
		this.handler = handler;

		this.socket = io(this.serverUri, {
			transports: ["websocket"],
			autoConnect: false,
		});
		
		this.socket.on("connect", msg => {
			this.socket.emit('signin', {token: this.token});
			console.log("CONNECTED")
		});

		this.socket.on("connect_error", res => {
			console.log(res)
			this.socket.close();
		});

		this.socket.on("message", res => {
			this.add(res);
		});

		this.socket.open();
	}

	signout(){
		this.socket.emit("signout");
	}

	componentWillUnmount(){
		if(this.socket.connected){
			print("disco");
		}
	}

	render(){

	}
}