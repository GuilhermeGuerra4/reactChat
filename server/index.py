from flask import Flask, request
from functions.database import updateReaded, get_user_id_by_email, get_messages_from_chat, get_user_id_by_token, add_message, get_contacts, get_user_by_uid, get_last_sent_to_me, get_user_by_email, user_exists, update_token, add_user, verify_token, get_user_by_token, set_last_time_online, get_last_time_online
from functions.authentification_manager import verify_id_token, token_generator
from flask_socketio import SocketIO, emit, join_room, disconnect
import sqlite3
import time, json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'WJOPDQPW230-dqkpo.qwdio28768wdq'
socketio = SocketIO(app, cors_allowed_origins="*", ping_interval=30, ping_timeout=30, manage_session=True)



@app.route('/get_token', methods=['POST'])
def get_token():
	if request.method == 'POST':
		if not 'token' in request.form or not 'email' in request.form:
			return(json.dumps({'status': False, 'message': 'bad request'}))
		email = request.form['email']
		token = request.form['token']
		response = verify_id_token(email, token)
		
		if response['status'] == True:
			new_token = token_generator(email)
		else:
			return(json.dumps({'status': False, 'message': 'not authentificated'}))

		uid = response['userdata']['sub']
		name = response['userdata']['name']
		photo = response['userdata']['picture']

		if user_exists(email) == False:
			add_user(uid, name, email, photo, new_token)
		return(json.dumps({'status': True, 'message': 'success', 'token': new_token}))

@app.route('/get_user', methods=['POST'])
def get_user():
	if not 'email' in request.form:
		return(json.dumps({'status': False, 'message': 'bad request'}))
	email = request.form['email']
	user = get_user_by_email(email)
	if user == None:
		return(json.dumps({'status': False, 'message': 'user not found'}))

	array = {'name': user[1], 'email': user[2], 'photo': user[3], 'lastTimeOnline':user[4]}
	response = {'status': True, 'userdata': array}
	return(json.dumps(response))

@app.route('/get_messages', methods=['POST'])
def get_messages():
	message = request.form
	if not 'token' in message or not 'page' in message or not 'limit' in message:
		return json.dumps({'status': False, 'message': 'bad request'})

	if verify_token(message['token']) == False:
		return json.dumps({'status': False, 'message': 'not allowed'})

	contacts = get_contacts(message['token'], message['page'], message['limit']);
	i = 0
	new_array = []
	for contact in contacts:
		last = get_last_sent_to_me(contact, message['token'])
		if last == None:
			text = ''
			timestamp = ''
			readed = 1
		else:
			text = last[3]
			timestamp = last[4]
			readed = last[5]

		user = get_user_by_uid(contact)
		if user != None:
			new_array.append({"from": {"email": user[2], "name": user[1], "photo": user[3]}, "message": text, "timestamp": timestamp, "readed": readed})
		i+=1
	return json.dumps({'status': True, 'messages': new_array})

@app.route('/get_messages_chat', methods=['POST'])
def get_messages_chat():
	message = request.form
	if not 'token' in message or 'email' not in message:
		return(json.dumps({'status': False, 'message': 'bad request'}))
	
	new_array = []
	isRight = False
	token = message['token']
	user2_email = message['email']
	
	if verify_token(token) == False:
		return(json.dumps({'status': False, 'message': 'not allowed'})) 

	myuid = get_user_id_by_token(token)
	a = get_messages_from_chat(token, user2_email)
	for b in a:

		if b[1] == myuid:
			isRight = True
		else:
			isRight = False

		new_array.append({'title': b[3], "isRight": isRight})

	return(json.dumps({'status': True, 'messages': new_array}))  


@socketio.on('connect')
def connect():
	emit('connect', {});
	print("CONNECTED")

@socketio.on('disconnect')
def disconnect():
	print("DISCONNECTED")

@socketio.on('signin')
def signin(credencials):
	if verify_token(credencials['token']) == True:
		user = get_user_by_token(credencials['token'])
		join_room(user[2])
		print(user[2], " Joined")
	else:
		disconnect()

@socketio.on('message')
def message(message):
	if verify_token(message['token']) == True:
		print("MESSAGE SENT")
		user = get_user_by_token(message['token'])
		receiver_uid = get_user_by_email(message['receiver'])[0]
		add_message(user[0], receiver_uid, message['text'])	
		emit('message', {'from':{'name': user[1], 'email': user[2], 'photo': user[3]}, 'message': message['text'], 'timestamp': time.time(), 'readed':'0',}, room=message['receiver'])
	else:
		disconnect()

@socketio.on('get_status')
def get_status(status):
	if verify_token(status['token']) == True:
		set_last_time_online(status['token'])
		emit('get_status', {'email': status['email'], 'lastTimeOnline':get_last_time_online(status['email'])})
	else: 
		disconnect()
@socketio.on('update_readed')
def update_readed(update):
	if verify_token(update['token']) == True:
		updateReaded(get_user_id_by_token(update['token']), get_user_id_by_email(update['email']))

socketio.run(app, host="0.0.0.0", port=3000, debug=True)
