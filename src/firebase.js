import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASLUrGUg6P7xtpiGiolbUn2e_lm5bnOes",
  authDomain: "netflix-clone-7dbac.firebaseapp.com",
  projectId: "netflix-clone-7dbac",
  storageBucket: "netflix-clone-7dbac.appspot.com",
  messagingSenderId: "578242331369",
  appId: "1:578242331369:web:8bd5c00c940e3e8018e678",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
