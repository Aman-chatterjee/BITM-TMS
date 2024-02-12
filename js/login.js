import { isValidEmail, isPasswordValid } from "../js/validation.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA496E7QXZZLd4_Eljoi7vLC2z6F_MHf00",
  authDomain: "bit-tms.firebaseapp.com",
  projectId: "bit-tms",
  storageBucket: "bit-tms.appspot.com",
  messagingSenderId: "232243889341",
  appId: "1:232243889341:web:955fcad477709f69a4a3d4",
  measurementId: "G-BB5WL3PGC9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let loginUser = async (evt) => {
    evt.preventDefault();

    var email = document.getElementById("login-email").value.toLowerCase();
    var password = document.getElementById("login-password").value;

    if (!isValidEmail(email)) {
        alert("Please enter a valid email");
        return false;
      }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("Login Success with user id: "+user.uid);
    })
    .catch((error) => {
        alert("Email or Password is incorrect!");
        const errorCode = error.code;
        const errorMessage = error.message;
    });

}

//     auth.onAuthStateChanged(function(user) {
//     if (user) {
//       console.log("YO YO")
//     } else {
//         console.log("NO NO")
//     }
//   });

var form = document.getElementById('login-form');
if (form) {
  form.addEventListener('submit', loginUser);
}