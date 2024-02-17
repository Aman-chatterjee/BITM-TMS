import { app } from "../js/firebase-initialize.js";
import { isValidEmail } from "../js/validation.js";
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const pb = document.querySelector('my-progress-bar');

//Intitialize Firebase Auth
const auth = getAuth(app);
const db = getFirestore(app);







let loginUser = async (evt) => {
  evt.preventDefault();

  let email = document.getElementById("login-email").value.toLowerCase();
  let password = document.getElementById("login-password").value;

  if (!isValidEmail(email)) {
    alert("Please enter a valid email");
    return false;
  }

  if(pb) pb.showProgressBar();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      if(pb) pb.hideProgressBar();
      //alert("Login Successful");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    })
    .finally(() => {
        pb.hideProgressBar();
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








let resetPasswrod = async (eve) =>{

let email = document.getElementById("login-email").value.toLowerCase();
if (!isValidEmail(email)) {
  alert("Please enter a valid email");
  return false;
}

pb.showProgressBar();
sendPasswordResetEmail(auth, email)
  .then(() => {
      alert("Password reset email sent!")
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  })
  .finally(()=>{
    pb.hideProgressBar();
  });
}








//Detect change in authentication
auth.onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signout-container').style.display = 'block';
    triggerAuthStateChangedEvent(user);
  
    const docRef = doc(db, "users", user.uid);
    const docSnap = getDoc(docRef)
    .then((snapshot)=>{
      let fullName = snapshot.data().firstName +" "+snapshot.data().lastName;
            document.getElementById('user-info').innerHTML = 
            `
            <p>${fullName}</p>
            <p>${user.email}</p>
            `;
    }).catch((error) => {
      console.log("Error getting document:", error);
  });
    
   
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


let login_form = document.getElementById('login-form');
let logout_btn = document.getElementById('logout-button');
let forgot_pass = document.getElementById('forgot-password');

if (login_form) { login_form.addEventListener('submit', loginUser); }
logout_btn.addEventListener('click', logoutUser);
forgot_pass.addEventListener('click', resetPasswrod);


//Query
//   const docRef = collection(db, "users");
    //   const q = query(docRef, where("userID", "==", user.uid));
    //   const querySnapshot = getDocs(q)
    //   .then(querySnapshot => {
    //     querySnapshot.forEach((doc) => {
    //       // Display user information
    //       var fullName = doc.data().firstName +" "+doc.data().lastName;
    //       document.getElementById('user-info').innerHTML = 
    //       `
    //       <p>${fullName}</p>
    //       <p>${user.email}</p>
    //       `;

    //     });
   
    //  });