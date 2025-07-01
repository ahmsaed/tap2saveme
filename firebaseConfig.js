import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

let getReactNativePersistence, ReactNativeAsyncStorage;

const firebaseConfig = {
  apiKey: "AIzaSyD9vaAtal8e0MRD4xwi_QPEBEArVm5vC68",
  authDomain: "tap2save-91b03.firebaseapp.com",
  projectId: "tap2save-91b03",
  storageBucket: "tap2save-91b03.firebasestorage.app",
  messagingSenderId: "142168596537",
  appId: "1:142168596537:web:dd7326d05db97692ad6de8",
  measurementId: "G-NECSS74M9W"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;

if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  getReactNativePersistence = require('firebase/auth').getReactNativePersistence;
  ReactNativeAsyncStorage = require('@react-native-async-storage/async-storage').default;

  try {
    auth = getAuth(app);
  } catch (error) {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }
}

const db = getFirestore(app);

export { app, auth, db };
