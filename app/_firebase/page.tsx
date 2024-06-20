import axios from "axios";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBv0WHqQH5MFI9Whc2pcsp-meQNvce-7rY",
  authDomain: "auth1-b38e2.firebaseapp.com",
  projectId: "auth1-b38e2",
  storageBucket: "auth1-b38e2.appspot.com",
  messagingSenderId: "735845997693",
  appId: "1:735845997693:web:4526100dfdd7123a8e2514",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    const response = await axios.post(
      "http://192.168.1.129:5000/api/v1/login/google",
      { token }
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};
