import { app } from "../js/firebase-initialize.js";
import { isValidEmail, isPasswordValid } from "../js/validation.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

let registerUser = async (evt) => {
  evt.preventDefault();

  var fName = document.getElementById("student-first-name").value;
  var lName = document.getElementById("student-last-name").value;
  var rollNo = document.getElementById("student-roll-no").value;
  var phoneNo = document.getElementById("student-phone-no").value;
  var dob = document.getElementById("student-dob").value;
  var gender = document.getElementById("student-gender").value;
  var course = document.getElementById("student-course").value;
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
    var uID = user.uid;

    const userRef = collection(db, "users");
    const docRef = await setDoc(doc(userRef, user.uid), {
      userID: uID,
      firstName: fName,
      lastName: lName,
      rollNo: rollNo,
      email: email,
      phoneNo: phoneNo,
      dob: dob,
      gender: gender,
      course: course,
      accountType: "student"
    }).then(() => {
        alert("Student registered successfully");
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

    // const docRef = await addDoc(collection(db, "root/users/student"), {
    //   userID: uID,
    //   firstName: fName,
    //   lastName: lName,
    //   rollNo: rollNo,
    //   email: email,
    //   phoneNo: phoneNo,
    //   dob: dob,
    //   gender: gender,
    //   course: course
    // }).then(() => {
    //       alert("Student registered successfully");
    //       console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //       console.error("Error writing document: ", error);
    //   });
  
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
