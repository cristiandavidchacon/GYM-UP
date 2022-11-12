import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3xeeCFn1gCXM342-RVK7mZXN-JOf19sA",
  authDomain: "gym-up-uao.firebaseapp.com",
  projectId: "gym-up-uao",
  storageBucket: "gym-up-uao.appspot.com",
  messagingSenderId: "883248474784",
  appId: "1:883248474784:web:923bf516540f2b91a837c5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default getFirestore(app);
