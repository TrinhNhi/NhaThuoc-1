// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDSxjiTyQIdFY2JNzo86YWJ8B0n1m1vyTU',
  authDomain: 'pharmacy-640c8.firebaseapp.com',
  projectId: 'pharmacy-640c8',
  storageBucket: 'pharmacy-640c8.appspot.com',
  messagingSenderId: '673010356300',
  appId: '1:673010356300:web:7f5eaee7e4510bb5bfa4e9',
  measurementId: 'G-C29GR5ZJGB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
