import sqlite3, time
database = "database.db"
connection = None


def connect():
	global database, connection
	
	try:
		connection = sqlite3.connect(database)
	except sqlite3.IntegrityError as error:
		print(error)

	return connection

# verify if the user token is valid
def verify_token(token):
	try:
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("SELECT COUNT(*) FROM users WHERE token LIKE '{0}'".format(token))
		row = cursor.fetchone()
		cursor.close()
		conn.close()

		if int(row[0]) == 1:
			return True
		else:
			return False


	except sqlite3.IntegrityError as error:
		print(error)

# verify if the user is alredy in database
def user_exists(email):
	try:
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("SELECT COUNT(*) FROM users WHERE email LIKE '{}'".format(email))
		row = cursor.fetchone()
	except sqlite3.IntegrityError as error:
		print(error)
	finally:
		cursor.close()
		conn.close()
		if int(row[0]) == 1:
			return True
		else:
			return False

# update the user's token
def update_token(email, new_token):
	try: 
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("UPDATE users SET token = '{0}' WHERE email LIKE '{1}'".format(new_token, email))
		conn.commit()
	except sqlite3.IntegrityError as error:
		print(error)
	finally:
		cursor.close()
		conn.close()

def add_user(uid, name, email, photo, token):
	try:
		conn = connect()
		cursor = conn.cursor()
		timestamp = str(time.time())
		arr = (uid, name, email, photo, timestamp, timestamp, token)
		cursor.execute("INSERT INTO users(uid, name, email, photo, lastTimeOnline, dateCreatedAccount, token) VALUES (?,?,?,?,?,?,?)", arr)
		conn.commit()
	except sqlite3.IntegrityError as error:
		print(error)
	finally:
		cursor.close()
		conn.close()


# return the user data by his email
def get_user_by_email(email):
	try:
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("SELECT * FROM users WHERE email LIKE '{}'".format(email))
		row = cursor.fetchone()

	except sqlite3.IntegrityError as error:
		print("error: ", error)
	finally:
		conn.commit()
		cursor.close()
		conn.close()
		return row

def get_user_id_by_email(email):
	user = get_user_by_email(email)
	if user == None:
		return None
	else:
		return user[0]

# return the user data by his email
def get_user_by_uid(uid):
	try:
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("SELECT * FROM users WHERE uid LIKE '{}'".format(uid))
		row = cursor.fetchone()

	except sqlite3.IntegrityError as error:
		print("error: ", error)
	finally:
		conn.commit()
		cursor.close()
		conn.close()
		return row


def get_user_id_by_email(email):
	user = get_user_by_email(email)
	if user == None:
		return None
	else:
		return user[0]

def get_user_id_by_token(token):
	user = get_user_by_token(token)
	if user == None:
		return None
	else:
		return user[0]

def get_user_by_token(token):
	try:
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("SELECT * FROM users WHERE token LIKE '{}'".format(token))
		row = cursor.fetchone()

	except sqlite3.IntegrityError as error:
		print("error: ", error)
	finally:
		conn.commit()
		cursor.close()
		conn.close()
		return row

def get_last_time_online(email):
	try:
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("SELECT lastTimeOnline FROM users WHERE email LIKE '{}'".format(email))
		row = cursor.fetchone()
		cursor.close()
		conn.close()
		return row[0]
	except sqlite3.IntegrityError as error:
		print(error)

def set_last_time_online(token):
	try:
		conn = connect()
		cursor = conn.cursor()
		now = str(time.time())
		cursor.execute("UPDATE users SET lastTimeOnline = '{}' WHERE token LIKE '{}'".format(now, token))
		conn.commit()
		cursor.close()
		conn.close()

	except sqlite3.IntegrityError as error:
		print(error)

def get_contacts(token, page=1, limit=10):
	uid = get_user_id_by_token(token)
	ini = 0
	ini += (int(limit) * int(page)) - int(limit)
	try:
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("SELECT `from`, `to` FROM messages WHERE `to` LIKE '{0}' OR `from` LIKE '{1}' GROUP BY `from`, `to` ORDER BY `timestamp` DESC LIMIT {2}, {3}".format(uid, uid, ini, limit))
		rows = cursor.fetchall()
		print('all: ',rows)
		newrows = []
		for row in rows:
			print(row)
			if row[0] == uid:
				if row[1] not in newrows:
					newrows.append(row[1])
			else:
				if row[0] not in newrows:
					newrows.append(row[0])

		cursor.close()
		conn.close()
		return tuple(newrows)
	except sqlite3.IntegrityError as error:
		print(error)

def get_messages_from_chat(user_token, user2_email):

	user1_uid = get_user_id_by_token(user_token)
	user2_uid = get_user_id_by_email(user2_email)

	try:
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("SELECT * FROM messages WHERE `from` LIKE '{0}' and `to` LIKE '{1}' or `from` LIKE '{1}' and `to` LIKE '{0}'".format(user1_uid, user2_uid))
		row = cursor.fetchall()
		return row
	except sqlite3.IntegrityError as error:
		print(error)

def get_last_sent_to_me(senderuid, receiver_token):
	
	receiveruid = get_user_id_by_token(receiver_token)
	
	if senderuid == None or receiveruid == None:
		return False
	try: 
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("SELECT * FROM `messages` WHERE `from` LIKE '{}' and `to` LIKE '{}' ORDER BY `timestamp` DESC LIMIT 1".format(senderuid, receiveruid))
		row = cursor.fetchone()
		cursor.close()
		conn.close()
		return row
	except sqlite3.IntegrityError as error:
		print(error)


def add_message(sender_uid, receiver_uid, message):
	try:
		conn = connect()
		cursor = conn.cursor()
		timestamp = str(time.time())
		arr = (None, sender_uid, receiver_uid, message, timestamp, '0')
		cursor.execute("INSERT INTO messages(`uid`, `from`, `to`, `message`, `timestamp`, readed) VALUES (?,?,?,?,?,?)", arr)
		conn.commit()
		cursor.close()
		conn.close()
	except sqlite3.IntegrityError as error:
		print(error)

def updateReaded(uid, senderuid):
	print('myid ', uid)
	print('senderuid: ', senderuid)
	try:
		conn = connect()
		cursor = conn.cursor()
		cursor.execute("UPDATE `messages` SET readed = '1' WHERE `to` LIKE '{}' and `from` LIKE {} or `to` LIKE '{}' and `from` LIKE '{}'".format(senderuid, uid, uid, senderuid))
		conn.commit()
		cursor.close()
		conn.close()
	except sqlite3.IntegrityError as error:
		print(error)