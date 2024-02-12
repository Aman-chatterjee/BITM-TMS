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

  var fName = document.getElementById("employee-first-name").value;
  var lName = document.getElementById("employee-last-name").value;
  var phoneNo = document.getElementById("employee-phone-no").value;
  var dob = document.getElementById("employee-dob").value;
  var gender = document.getElementById("employee-gender").value;
  var employeeID = document.getElementById("employee-id").value;
  var employeeRole = document.getElementById("employee-role").value;
  var email = document.getElementById("employee-email").value.toLowerCase();
  var password = document.getElementById("employee-password").value;
  var conPassword = document.getElementById("employee-confirm-password").value;

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
    var uID = user.uid;
    const docRef = await addDoc(collection(db, "root/users/employee"), {
      userID: uID,
      firstName: fName,
      lastName: lName,
      email: email,
      phoneNo: phoneNo,
      dob: dob,
      gender: gender,
      employeeRole: employeeRole,
      employeeID: employeeID
    }).then(() => {
          alert("Employee registered successfully");
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
  
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
  }
};

var form = document.getElementById('employee-registration-form');
if (form) {
  form.addEventListener('submit', registerUser);
}
