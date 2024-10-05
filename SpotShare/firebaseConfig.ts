import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBenuu8ct7e1LUv7Kj_sCcTuwsBna11Rck",
    authDomain: "spotshare-f9cf2.firebaseapp.com",
    projectId: "spotshare-f9cf2",
    storageBucket: "spotshare-f9cf2.appspot.com",
    messagingSenderId: "323865923567",
    appId: "1:323865923567:web:72ec47c87543104555301a",
    measurementId: "G-6T5Y3GZG20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
