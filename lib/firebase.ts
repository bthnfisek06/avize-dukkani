import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzE-86Qb1FXARRE8vbJoZ7qjV0Q_8XnpU",
  authDomain: "nuve-lightning.firebaseapp.com",
  projectId: "nuve-lightning",
  storageBucket: "nuve-lightning.appspot.com",
  messagingSenderId: "832822615557",
  appId: "1:832822615557:web:e5043cb8497841e61d466c"
};

// Uygulama daha önce başlatılmadıysa başlat
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
