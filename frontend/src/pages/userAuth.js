
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmSC8v-A1e1UlAbBnaonpP6oTYuqaDB38",
  authDomain: "login-page-8e88a.firebaseapp.com",
  projectId: "login-page-8e88a",
  storageBucket: "login-page-8e88a.appspot.com",
  messagingSenderId: "345353738525",
  appId: "1:345353738525:web:246c7b889ed13c38bd29f4"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
