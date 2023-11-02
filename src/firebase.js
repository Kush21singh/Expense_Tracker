// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCe8Vk5OTAlxZTIt4GgjvaYO0enQyhHdd4",
  authDomain: "expense-tracker-74dbe.firebaseapp.com",
  projectId: "expense-tracker-74dbe",
  storageBucket: "expense-tracker-74dbe.appspot.com",
  messagingSenderId: "655097265417",
  appId: "1:655097265417:web:501bcefb548569de1ce7d8",
  measurementId: "G-R7P3TTWJXF"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
export default auth

