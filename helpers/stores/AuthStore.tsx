import { makeAutoObservable } from 'mobx'
import Firebase from '../../config/firebase'

type RegisterDetails = {
  email: string
  password: string
  firstName: string
  lastName: string
}

class AuthStore {
  constructor() {
    makeAutoObservable(this)
  }

  signUpUser(
    details: RegisterDetails,
    onComplete: (user: User) => void,
    onError: (error: any) => void
  ) {
    Firebase.auth()
      .createUserWithEmailAndPassword(details.email, details.password)
      .then((userCredentials) => {
        console.log('USER CRED', userCredentials)
        const user: User = {
          uuid: userCredentials.user.uid,
          firstName: details.firstName,
          lastName: details.lastName,
          routes: [],
        }
        Firebase.database()
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
    Firebase.auth()
      .signInWithEmailAndPassword(details.email, details.password)
      .then((userCredentials) => {
        Firebase.database()
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
}

export default AuthStore
