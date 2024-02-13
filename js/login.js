import { isValidEmail, isPasswordValid } from "../js/validation.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

let logoutUser = async (evt) => {

  signOut(auth)
  .then(() => {
      // Sign-out successful.
      alert("Logout successful");
  })
  .catch((error) => {
      // An error happened.
      console.error("Logout error:", error);
      alert("Error during logout. Please try again.");
  });

}

    //Detect change in authentication
    auth.onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById('login-container').style.display = 'none';
      document.getElementById('signout-container').style.display = 'block';

      // Display user information
      document.getElementById('user-info').innerHTML = `
          <p>Email: ${user.email}</p>
          <p>User ID: ${user.uid}</p>
      `;
    } else {
      document.getElementById('login-container').style.display = 'block';
      document.getElementById('signout-container').style.display = 'none';
    }
    
  });


var login_form = document.getElementById('login-form');
var logout_btn = document.getElementById('logout-button');
if (login_form){ login_form.addEventListener('submit', loginUser); }
logout_btn.addEventListener('click', logoutUser);