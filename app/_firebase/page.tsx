import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth,signInWithPopup} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAnC5Wgyie-Jgi666ZjPWc7fM9EsJNqqO8",
  authDomain: "auth-be532.firebaseapp.com",
  projectId: "auth-be532",
  storageBucket: "auth-be532.appspot.com",
  messagingSenderId: "176728565845",
  appId: "1:176728565845:web:6060f45f6561b778044cdc"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export const signInWithGoogle=()=>{
     signInWithPopup(auth,provider).then((result:any)=>{
        console.log(result,"result")
     })
     .catch((error:any)=>{
        console.log(error)
     })
}