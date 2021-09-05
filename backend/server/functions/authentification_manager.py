import json, requests, hashlib
from flask import session
from functions.database import add_user

def verify_id_token(email=None, id_token=None):
	return False

def token_generator(user_email):
	token = hashlib.sha256((user_email+salt).encode('ascii')).hexdigest()
	return token