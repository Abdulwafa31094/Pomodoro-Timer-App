import { initializeApp } from 'firebase/app'
import "firebase/auth";
import { getAuth } from 'firebase/auth';

// Replace these config values with your own Firebase config values
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase with the configuration
// const firebase = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// const auth = getAuth(firebase)
export const auth = getAuth(app)

// Optional: Add more Firebase services (e.g., Firestore) if you need them
// const firestore = firebase.firestore();

// Export any services you need to use throughout your app
// export default firebase;
