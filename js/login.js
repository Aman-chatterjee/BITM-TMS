import { app } from "../js/firebase-initialize.js";
import { isValidEmail } from "../js/validation.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, doc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

//Intitialize Firebase Auth
const auth = getAuth(app);
const db = getFirestore(app);

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
      alert("Login Successful");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
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
auth.onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signout-container').style.display = 'block';
    triggerAuthStateChangedEvent(user);
  
      const docRef = collection(db, "users");
      const q = query(docRef, where("userID", "==", user.uid));
      const querySnapshot = getDocs(q)
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          // Display user information
          var fullName = doc.data().firstName +" "+doc.data().lastName;
          document.getElementById('user-info').innerHTML = 
          `
          <p>${fullName}</p>
          <p>${user.email}</p>
          `;
        });
   
     })
   
  } else {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('signout-container').style.display = 'none';
    triggerAuthStateChangedEvent(user);
  }

});




function triggerAuthStateChangedEvent(user) {
  const authStateChangedEvent = new CustomEvent('authStateChanged', { detail: { user } });
  document.dispatchEvent(authStateChangedEvent);
}


var login_form = document.getElementById('login-form');
var logout_btn = document.getElementById('logout-button');
if (login_form) { login_form.addEventListener('submit', loginUser); }
logout_btn.addEventListener('click', logoutUser);