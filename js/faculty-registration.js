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

  let fName = document.getElementById("faculty-first-name").value;
  let lName = document.getElementById("faculty-last-name").value;
  let phoneNo = document.getElementById("faculty-phone-no").value;
  let dob = document.getElementById("faculty-dob").value;
  let gender = document.getElementById("faculty-gender").value;
  let department = document.getElementById("faculty-department").value;
  let email = document.getElementById("faculty-email").value.toLowerCase();
  let password = document.getElementById("faculty-password").value;
  let conPassword = document.getElementById("faculty-confirm-password").value;

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
      department: department,
      accountType: "faculty"
    }).then(() => {
          alert("Faculty registered successfully");
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

var form = document.getElementById('faculty-registration-form');
if (form) {
  form.addEventListener('submit', registerUser);
}
