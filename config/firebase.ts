import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API,
  authDomain: 'digital-orientation.firebaseapp.com',
  projectId: 'digital-orientation',
  storageBucket: 'digital-orientation.appspot.com',
  messagingSenderId: '724819056475',
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: 'G-CRF3Z66TN5',
};

try {
  firebase.initializeApp(firebaseConfig);
  console.log('FIREBASE_INITALIZED', process.env.NEXT_PUBLIC_FB_API);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.log('FIREBASE ALREADY INITALIZED');
  }
}

const Firebase = firebase;
export default Firebase;
