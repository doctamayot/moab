import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyCOhHSFKjBWwblmLTnR3XTI0us0cZRWG-g',
  authDomain: 'moab-dbe23.firebaseapp.com',
  projectId: 'moab-dbe23',
  storageBucket: 'moab-dbe23.appspot.com',
  messagingSenderId: '298830954317',
  appId: '1:298830954317:web:dd44549e0fe1180b1a0104',
  measurementId: 'G-QCYDX8TKDS',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
