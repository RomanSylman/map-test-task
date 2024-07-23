import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "viso-map-task.firebaseapp.com",
  projectId: "viso-map-task",
  storageBucket: "viso-map-task.appspot.com",
  messagingSenderId: "9558781604",
  appId: "1:9558781604:web:a521f61dd13d22c2710031",
  measurementId: "G-7EDEGCH8SX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
