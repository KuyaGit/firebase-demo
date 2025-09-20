import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from './environments/environment';

// Your web app's Firebase configuration
// For Firebase JS SDK v9 and later, measurementId is optional
const firebaseConfig = {
  apiKey: environment.GOOGLE_API_KEY.toString(),
  authDomain: environment.GOOGLE_AUTH_DOMAIN,
  projectId: environment.PROJECT_ID,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId,
  appId: environment.appId,
  measurementId: environment.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
