import sqlite3
from functions.database import get_contacts, add_message, get_user_by_uid, get_last_sent_to_me, get_contacts, get_user_id_by_token, verify_token, get_user_by_token, get_last_time_online, set_last_time_online
from functions.authentification_manager import verify_id_token, token_generator
from time import sleep




#print(get_last_time_online("guilhermeguerra12345@gmail.com"))
#sleep(3)
#set_last_time_online('454bbf8974ab3bce04371e18c6f9df956cac1ac9f864ee45476ea1904c7b10aa')
#print(get_last_time_online("guilhermeguerra12345@gmail.com"))
#print(get_user_by_token("454bbf8974ab3bce04371e18c6f9df956cac1ac9f864ee45476ea1904c7b10aa"))
#print(verify_token("454bbf8974ab3bce04371e18c6f9df956cac1ac9f864ee45476ea1904c7b10aa"))

#112765047039970027936

#get_user_id_by_token("")


#print(get_contacts('454bbf8974ab3bce04371e18c6f9df956cac1ac9f864ee45476ea1904c7b10aa'))