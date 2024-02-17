import { app } from "../js/firebase-initialize.js";
import { isValidEmail, isPasswordValid } from "../js/validation.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const pb = document.querySelector('my-progress-bar');

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

let registerUser = async (evt) => {
  evt.preventDefault();

  let fName = document.getElementById("student-first-name").value;
  let lName = document.getElementById("student-last-name").value;
  let rollNo = document.getElementById("student-roll-no").value;
  let phoneNo = document.getElementById("student-phone-no").value;
  let dob = document.getElementById("student-dob").value;
  let gender = document.getElementById("student-gender").value;
  let course = document.getElementById("student-course").value;
  let email = document.getElementById("student-email").value.toLowerCase();
  let password = document.getElementById("student-password").value;
  let conPassword = document.getElementById("student-confirm-password").value;

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
    pb.showProgressBar();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uID = user.uid;

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
        let newPageUrl = "../index.html";
        window.open(newPageUrl, "_self");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    })
    .finally(()=>{
      pb.hideProgressBar();
    })


  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
    pb.hideProgressBar();
  }
};

var form = document.getElementById('student-registration-form');
if (form) {
  form.addEventListener('submit', registerUser);
}
