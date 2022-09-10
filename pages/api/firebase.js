import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDPSkBmN6hX-f3_NUeF_ltoHfCXY63LuZI",
  authDomain: "room-423c7.firebaseapp.com",
  projectId: "room-423c7",
  storageBucket: "room-423c7.appspot.com",
  messagingSenderId: "662251326766",
  appId: "1:662251326766:web:182e83007d40a2cb677ebf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);