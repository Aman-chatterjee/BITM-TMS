import { app } from "../js/firebase-initialize.js";
import { isValidEmail, isPasswordValid, isPhoneNoValid} from "../js/validation.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const pb = document.querySelector('my-progress-bar');

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

let registerUser = async (evt) => {
  evt.preventDefault();

  let fName = document.getElementById("employee-first-name").value;
  let lName = document.getElementById("employee-last-name").value;
  let phoneNo = document.getElementById("employee-phone-no").value;
  let dob = document.getElementById("employee-dob").value;
  let gender = document.getElementById("employee-gender").value;
  let employeeID = document.getElementById("employee-id").value;
  let employeeRole = document.getElementById("employee-role").value;
  let email = document.getElementById("employee-email").value.toLowerCase();
  let password = document.getElementById("employee-password").value;
  let conPassword = document.getElementById("employee-confirm-password").value;

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

  if(!isPhoneNoValid(phoneNo)){
    alert("Please enter a valid phone number");
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
      email: email,
      phoneNo: phoneNo,
      dob: dob,
      gender: gender,
      employeeRole: employeeRole,
      employeeID: employeeID,
      accountType: "employee"
    }).then(() => {
          alert("Employee registered successfully");
          console.log("Document successfully written!");
          let newPageUrl = "../index.html";
          window.open(newPageUrl, "_self");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      })
      .finally(()=>{
          pb.hideProgressBar();
      });
  
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
    pb.hideProgressBar();
  }
};

var form = document.getElementById('employee-registration-form');
if (form) {
  form.addEventListener('submit', registerUser);
}
