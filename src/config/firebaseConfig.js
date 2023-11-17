import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA6U0hBtmr6vzI0y7hPPmS84pOwoYHMB4M",
  authDomain: "noteifyx.firebaseapp.com",
  databaseURL: "https://noteifyx-default-rtdb.firebaseio.com",
  projectId: "noteifyx",
  storageBucket: "noteifyx.appspot.com",
  messagingSenderId: "302286626811",
  appId: "1:302286626811:web:7af8a68be57a5d5b00b55e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;