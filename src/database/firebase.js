import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBhiRch0XyoTUYbnXoch8027qR8da_VzeU",
    authDomain: "reactchat-8ba65.firebaseapp.com",
    databaseURL: "https://reactchat-8ba65.firebaseio.com",
    projectId: "reactchat-8ba65",
    storageBucket: "reactchat-8ba65.appspot.com",
    messagingSenderId: "797686492314",
    appId: "1:797686492314:web:f4cc5ef21c3e2513f7c323",
    measurementId: "G-3385SDJZVS"
  };

try{
	firebase.initializeApp(firebaseConfig);
}
catch(e){
	console.log(e);
}

export default firebase;