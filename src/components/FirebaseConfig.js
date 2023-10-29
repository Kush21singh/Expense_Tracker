
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvev9F-NNqmr4SdRG_VcvQEjlLKAyaCWg",
  authDomain: "expensetracker-e1497.firebaseapp.com",
  projectId: "expensetracker-e1497",
  storageBucket: "expensetracker-e1497.appspot.com",
  messagingSenderId: "405268828223",
  appId: "1:405268828223:web:f949516fd4d35ac74ca88a"
};


const app = initializeApp(firebaseConfig);
export const database = getAuth(app)