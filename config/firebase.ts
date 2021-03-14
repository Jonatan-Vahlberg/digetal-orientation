import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API,
  authDomain: 'digital-orientation.firebaseapp.com',
  projectId: 'digital-orientation',
  storageBucket: 'digital-orientation.appspot.com',
  messagingSenderId: '724819056475',
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: 'G-CRF3Z66TN5',
  databaseURL:
    'https://digital-orientation-default-rtdb.europe-west1.firebasedatabase.app',
}

try {
  firebase.initializeApp(firebaseConfig)
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.log('FIREBASE ALREADY INITALIZED')
  }
}

const Firebase = firebase
export default Firebase
