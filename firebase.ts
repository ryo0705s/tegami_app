import firebase from "firebase/app";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  // apiKey: process.env.NEXT_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.NEXT_FIREBASE_DATABASE_URL,
  // projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_FIREBASE_MESSAGEING_SENDER_ID,
  // appId: process.env.NEXT_FIREBASE_APP_ID,
  apiKey: "AIzaSyCNOWL6WQRN0GEVJq7E0cV6TnHsr4PjOSQ",
  authDomain: "tegami-app.firebaseapp.com",
  databaseURL: "https://tegami-app.firebaseapp.com",
  projectId: "tegami-app",
  storageBucket: "tegami-app.appspot.com",
  messagingSenderId: "54665515800",
  appId: "1:54665515800:web:170a2d47862ab9cfd2846d",
  measurementId: "G-8R7RDZ6DGK",
});
console.log(firebaseApp);
// firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
// firebase.analytics();
