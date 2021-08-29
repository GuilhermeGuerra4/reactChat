import json, requests, hashlib
from flask import session
from functions.database import add_user

endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='
appid = '797686492314-eo7d48gt3lmceqem9n7qbg9q39sbd3cm.apps.googleusercontent.com'
salt = 'JIOD389Dhdiwqhi.0q89-wdhoe34iohDD'

def verify_id_token(email=None, id_token=None):
	
	userinfo = {"status": False, "userdata": None}

	if id_token and email:
		response = requests.get(endpoint+id_token)
		status_code = response.status_code
		content = response.json()

		if status_code == 200:
			if content["email"] == email and content["aud"] == appid:
				userinfo["userdata"] = content
				userinfo["status"] = True
	return userinfo


def token_generator(user_email):
	token = hashlib.sha256((user_email+salt).encode('ascii')).hexdigest()
	return token