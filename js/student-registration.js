import { isValidEmail, isPasswordValid } from "../js/validation.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let registerUser = async (evt) => {
  evt.preventDefault();

  var email = document.getElementById("student-email").value.toLowerCase();
  var password = document.getElementById("student-password").value;
  var conPassword = document.getElementById("student-confirm-password").value;

  if (!isValidEmail(email)) {
    alert("Please enter a valid email");
    return false;
  }

  if (!isPasswordValid(password)) {
    var alertText = "Your password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:";
    alert(alertText);
    return false;
  } else if (password !== conPassword) {
    var alertText = "Your password don't match";
    alert(alertText);
    return false;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("Student registered successfully");

    const docRef = await addDoc(collection(db, "users"), {
      email: email,
      password: password
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
  }
};

var form = document.getElementById('student-registration-form');
if (form) {
  form.addEventListener('submit', registerUser);
}
