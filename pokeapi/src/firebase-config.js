import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyDHM2AMeNYutSgs96cNUuun6fMs9wZqn_s",
  authDomain: "pokeapi-2c8e1.firebaseapp.com",
  projectId: "pokeapi-2c8e1",
  storageBucket: "pokeapi-2c8e1.appspot.com",
  messagingSenderId: "284479321667",
  appId: "1:284479321667:web:690cf09e912c33a52a06f6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, db, googleProvider, githubProvider }; 
