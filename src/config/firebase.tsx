import {initializeApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  initializeAuth,
  getReactNativePersistence,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  query,
  limit,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  onSnapshot,
} from 'firebase/firestore';

import {getStorage} from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';

// const apiKey = API_KEY;
// const authDomain = AUTH_DOMAIN;
// const projectId = PROJECT_ID;
// const storageBucket = STORAGE_BUCKET;
// const messagingSenderId = MESSAGING_SENDER;
// const appId = APP_ID;
// const measurementId = MEASUREMENT_ID;

const apiKey = 'AIzaSyAc5n_xuxFm2GHXyxfuyHCOOOdyaOg_T-4';

const authDomain = 'urban-article.firebaseapp.com';

const projectId = 'urban-article';

const storageBucket = 'urban-article.appspot.com';

const messagingSenderId = '196832293772';

const appId = '1:196832293772:web:9eb1fc1f06dc211789dca9';

const measurementId = 'G-9CZQ525E5V';

const app = initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
});

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const firestore = getFirestore(app);
const storage = getStorage(app);

export {
  firestore,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  storage,
  onAuthStateChanged,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  query,
  limit,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  onSnapshot,
  signInWithCredential,
  GoogleAuthProvider,
};
