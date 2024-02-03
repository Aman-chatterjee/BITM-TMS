
function validation(){
    var email = document.getElementById("email").value.toLowerCase();
    var pass = document.getElementById("password").value;
    
        if(email == "" || !isValidEmail(email)){
            alert("Please enter a valid Email");
            return false;
        }

        if(pass == ""){
            alert("Please enter a valid password!");
            return false;
        }
        
        if(pass.length < 8){
            alert("Password must be greater than 8 digit");
            return false;
        } 
        
        document.write("Logged in with "+ email);
        alert("Success!");
        return true;

    }


function isValidEmail(email) {
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
return emailRegex.test(email);
}
