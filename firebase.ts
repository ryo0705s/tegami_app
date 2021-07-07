import firebase from "firebase/app";

export const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.NEXT_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
