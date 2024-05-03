// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB10jH0utxzSdl66OgOkiF3CsPWvESMHTE",
  authDomain: "nj-chat-4a57a.firebaseapp.com",
  projectId: "nj-chat-4a57a",
  storageBucket: "nj-chat-4a57a.appspot.com",
  messagingSenderId: "438640034982",
  appId: "1:438640034982:web:651bee7fc1aa67d8a16067"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();

