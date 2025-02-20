import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDYbcumIOnHifYBMwTsbOJPmWsySKwRX-4',
  authDomain: 'fir-twitter-4b4d9.firebaseapp.com',
  projectId: 'fir-twitter-4b4d9',
  storageBucket: 'fir-twitter-4b4d9.appspot.com',
  messagingSenderId: '794243458963',
  appId: '1:794243458963:web:9c3fae522446c732b62a66',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
