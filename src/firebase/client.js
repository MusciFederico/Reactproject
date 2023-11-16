
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB_oyrNaa7-KF_bcNfO7Y8mKTuK-hr1lkA",
  authDomain: "reactproject-d2799.firebaseapp.com",
  projectId: "reactproject-d2799",
  storageBucket: "reactproject-d2799.appspot.com",
  messagingSenderId: "136705253131",
  appId: "1:136705253131:web:d5cba5a9b00aa7b0944c0e",
  measurementId: "G-3F2H3WY08J"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export { db }; 