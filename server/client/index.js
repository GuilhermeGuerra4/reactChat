
socket = io('http://85.242.4.235:3000', {
	transports: ["websocket"],
	timeout: 40000,
});

messagesbox = document.getElementById("messagesbox");
token = document.getElementById("token");
receiver = document.getElementById("receiver");
msg = document.getElementById("msg");
statusSpan = document.getElementById("status");
loginBtc = document.getElementById("login");
conn = false;

function login(token){
	socket.emit('signin', {'token':token});
	statusSpan.innerHTML = 'logged';
		console.log('logged');
	msg.disabled = false;
	conn = true;
}

function sendMessage(token, receiver, text){
	console.log('token: ', token, 'receiver: ', receiver, 'text: ', text);
	socket.emit('message', {'token':token, 'text':text, 'receiver':receiver});
}

socket.on('message', function(msg){
	messagesbox.innerHTML += '<div class="msg-block"><div class="from">@'+msg.from.email+'</div><div class="msg">'+msg.message+'</div></div>';
});

socket.on('new', function(msg){
	alert(msg);
});

socket.on('connect', function(){
	console.log("connected");
	statusSpan.innerHTML = 'connected';
	login(token);
});

socket.on('disconnect', function(){
	console.log("disconnect");
	statusSpan.innerHTML = 'disconnect';
	conn = false;
});

loginBtc.addEventListener('click', function(){

	login(token.value);

}, false);

msg.addEventListener('keydown', function(e){
	if(e.key == "Enter" && msg.value != "" && conn == true)
	{
		sendMessage(token.value, receiver.value, msg.value);
	}
}, false);
