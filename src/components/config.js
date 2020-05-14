import {GoogleSignin,GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';

GoogleSignin.configure({
	webClientId: '290100016532-ccf4v2tjl16kuvn5e7ihvsjv0es0mf01.apps.googleusercontent.com',
	offlineAccess: true, 
	forceCodeForRefreshToken: true,
});