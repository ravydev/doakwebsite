
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCZfQG8NSHVJrqTynQlqJ2PrN48Bi7nwp4",
  authDomain: "lojadoak-2c3b5.firebaseapp.com",
  projectId: "lojadoak-2c3b5",
  storageBucket: "lojadoak-2c3b5.appspot.com",
  messagingSenderId: "156581534411",
  appId: "1:156581534411:web:b8817b8190bebd33b6194e",
  measurementId: "G-50BKWYESBD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db ,auth, storage}