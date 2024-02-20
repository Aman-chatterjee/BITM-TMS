import { app } from "../js/firebase-initialize.js";
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth(app);

//Detect change in authentication
auth.onAuthStateChanged(function (user) {
    if (user) {
      triggerAuthStateChangedEvent(user);
    } else {
      triggerAuthStateChangedEvent(user);
    }
  
  });



  document.addEventListener('logoutUser', ()=>{

      signOut(auth)
      .then(() => {
        alert("Logout successful");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert("Error during logout. Please try again.");
      });

  });

 
  
  function triggerAuthStateChangedEvent(user) {
    const authStateChangedEvent = new CustomEvent('authStateChanged', { detail: { user } });
    document.dispatchEvent(authStateChangedEvent);
  }