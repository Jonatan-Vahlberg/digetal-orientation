import firebase from 'firebase'

const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FB_API,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: 'digital-orientation',
  storageBucket: 'digital-orientation.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGE_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FB_DATABASE,
}

export default function firebaseClient() {
  try {
    firebase.initializeApp(FIREBASE_CONFIG)
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.log('FIREBASE ALREADY INITALIZED')
    }
  }
}
