import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

// Your web app's Firebase configuration


// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGE_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// };


const app = initializeApp(firebaseConfig);


export{app};
