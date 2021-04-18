import { makeAutoObservable } from 'mobx'
import firebase from 'firebase/app'
import firebaseClient from '../../config/firebase'
import nookies from 'nookies'
import 'firebase/auth'

type RegisterDetails = {
  email: string
  password: string
  firstName: string
  lastName: string
}

class AuthStore {
  constructor() {
    makeAutoObservable(this)
    firebaseClient()
    firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        nookies.set(undefined, 'FB_TOKEN', '', {})
        return
      }
      const token = await user.getIdToken()
      nookies.set(undefined, 'FB_TOKEN', token, {})
    })
  }

  signUpUser(
    details: RegisterDetails,
    onComplete: (user: User) => void,
    onError: (error: any) => void
  ) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(details.email, details.password)
      .then((userCredentials) => {
        const user: User = {
          uuid: userCredentials.user.uid,
          firstName: details.firstName,
          lastName: details.lastName,
          routes: [],
        }
        firebase
          .database()
          .ref(`users/${userCredentials.user.uid}`)
          .set(user, () => onComplete(user))
          .catch((error) => {
            console.log('REJECTED', error)
            onError(error)
          })
      })
      .catch((error) => {
        console.log('REJECTED', error)
        onError(error)
      })
  }

  signInUser(
    details: { email: string; password: string },
    onComplete: (user: User) => void,
    onError?: (error: any) => {}
  ) {
    firebase
      .auth()
      .signInWithEmailAndPassword(details.email, details.password)
      .then((userCredentials) => {
        firebase
          .database()
          .ref(`users/${userCredentials.user.uid}`)
          .get()
          .then((userSnapshot) => {
            if (userSnapshot.exists()) {
              const user: User = userSnapshot.val()
              if (!user.routes) {
                user.routes = []
              }
              onComplete(user)
            } else {
              onError('ERROR_404')
            }
          })
          .catch((error) => {
            if (onError) {
              onError(error)
            }
          })
      })
  }

  signoutUser(onSignout: () => void) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        onSignout()
      })
  }
}

export default AuthStore
