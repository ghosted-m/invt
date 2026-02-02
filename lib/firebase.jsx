import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDcVlwG1HsNPqsXFGKM-hpyc-NtMr1ZxeQ",
  authDomain: "invt-6e6fb.firebaseapp.com",
  projectId: "invt-6e6fb",
  storageBucket: "invt-6e6fb.firebasestorage.app",
  messagingSenderId: "1020596043201",
  appId: "1:1020596043201:web:1d000540a1e5f4dfed4340",
  measurementId: "G-7PC2TKFG69"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance
const auth = getAuth(app);

export { db, auth };