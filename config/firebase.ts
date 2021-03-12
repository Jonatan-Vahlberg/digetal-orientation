import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBUyfI6mGxp-CCMQ4dHkwXZQ1MmZdBuflk',
  authDomain: 'digital-orientation.firebaseapp.com',
  projectId: 'digital-orientation',
  storageBucket: 'digital-orientation.appspot.com',
  messagingSenderId: '724819056475',
  appId: '1:724819056475:web:2c3a08d6cd48bd11cd2c7e',
  measurementId: 'G-CRF3Z66TN5',
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
  }
}

const Firebase = firebase;
export default Firebase;
