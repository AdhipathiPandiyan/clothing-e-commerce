import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAn75mIKznNLgfAhR5jTcZdiQP42dyPq5g',
  authDomain: 'crown-db-f14bb.firebaseapp.com',
  databaseURL: 'https://crown-db-f14bb.firebaseio.com',
  projectId: 'crown-db-f14bb',
  storageBucket: '',
  messagingSenderId: '344479028102',
  appId: '1:344479028102:web:b86f44e9936254b8',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
