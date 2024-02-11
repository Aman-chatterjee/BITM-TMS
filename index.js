import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA496E7QXZZLd4_Eljoi7vLC2z6F_MHf00",
  authDomain: "bit-tms.firebaseapp.com",
  projectId: "bit-tms",
  storageBucket: "bit-tms.appspot.com",
  messagingSenderId: "232243889341",
  appId: "1:232243889341:web:3a3c86da42e6360ea4a3d4",
  measurementId: "G-S66D439DSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);