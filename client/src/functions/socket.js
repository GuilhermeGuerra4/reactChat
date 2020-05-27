import React, {Component} from "react";
import io from "socket.io-client";

export default class Socket{
	
	constructor(){
		this.serverUri = "http://85.242.4.235:3000";
	}

	add(res){
		this.handler(res);
	}

	updateStatus(res){
		this.handler2(res);
	}

	connect(token, handler, handler2){
		
		this.token = token;
		this.handler = handler;
		this.handler2 = handler2;

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

		this.socket.on('get_status', res => {
			this.updateStatus(res);
		});

		this.socket.open();
	}

	sendMessage(token, message, email){
		this.socket.emit('message', {'token':token, 'text':message, 'receiver':email});
	}

	updateReaded(email){
		this.socket.emit('update_readed', {'token': this.token, 'email': email});
	}

	getStatus(email){
		this.socket.emit('get_status', {'token': this.token,'email': email});
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