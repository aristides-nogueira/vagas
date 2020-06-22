import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAD2nlqnNZfUtGaV_Z6Ta_eB55N27-6jrM",
  authDomain: "classroom-emails.firebaseapp.com",
  databaseURL: "https://classroom-emails.firebaseio.com",
  projectId: "classroom-emails",
  storageBucket: "classroom-emails.appspot.com",
  messagingSenderId: "932392480727",
  appId: "1:932392480727:web:2c5303bf16a92a6a85a592",
  measurementId: "G-ZERZV8Q07P"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
