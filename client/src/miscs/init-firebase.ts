// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: replace with env
const firebaseConfig = {
  apiKey: 'AIzaSyBo6nIhT0-SDSaDg3jUAkDhoxP90YOHP6g',
  authDomain: 'webos-yonsei.firebaseapp.com',
  projectId: 'webos-yonsei',
  storageBucket: 'webos-yonsei.appspot.com',
  messagingSenderId: '568208307504',
  appId: '1:568208307504:web:5c273ae95a70bf35a6c4f5',
  measurementId: 'G-XBC5ZCB3XQ',
};

// Initialize Firebase

export function initFirebase() {
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}
