// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAumXS-fxBNGiIgZERjCE6tqxP6ahsEvSY",
  authDomain: "react-project-1a7f4.firebaseapp.com",
  projectId: "react-project-1a7f4",
  storageBucket: "react-project-1a7f4.appspot.com",
  messagingSenderId: "245585716777",
  appId: "1:245585716777:web:db8126537e42e1e8199e38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)