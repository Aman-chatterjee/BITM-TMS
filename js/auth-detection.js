import { app } from "../js/firebase-initialize.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth(app);

//Detect change in authentication
auth.onAuthStateChanged(function (user) {
    if (user) {
      triggerAuthStateChangedEvent(user);
    } else {
      triggerAuthStateChangedEvent(user);
    }
  
  });
  
  
  function triggerAuthStateChangedEvent(user) {
    const authStateChangedEvent = new CustomEvent('authStateChanged', { detail: { user } });
    document.dispatchEvent(authStateChangedEvent);
  }