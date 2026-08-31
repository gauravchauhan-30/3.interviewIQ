
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview-agent-38664.firebaseapp.com",
  projectId: "interview-agent-38664",
  storageBucket: "interview-agent-38664.firebasestorage.app",
  messagingSenderId: "831436539639",
  appId: "1:831436539639:web:6238b3d4997e19622575f2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}