import {getApp, getApps, initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC1FvD86dEeWFjxbYADIPDzQaDEqtQW5ho",
    authDomain: "chat-app-bf323.firebaseapp.com",
    projectId: "chat-app-bf323",
    storageBucket: "chat-app-bf323.appspot.com",
    messagingSenderId: "352554894368",
    appId: "1:352554894368:web:73b55f01fa2f44b020e845"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

  const firebaseAuth = getAuth(app)
  const firestoreDB = getFirestore(app)

  export { app, firebaseAuth, firestoreDB}