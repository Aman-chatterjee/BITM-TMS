
function validation(){
    var email = document.getElementById("email").value.toLowerCase();
    var pass = document.getElementById("password").value;
    
        if(!isValidEmail(email)){
            alert("Please enter a valid Email");
            return false;
        }

        if(!isPasswordValid(pass)){
            alertText = "Your password must contain of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
            alert(alertText);
            return false;
        } 
        
        alert("Success!");
        document.write("Loggedin with "+ email);
        return true;

    }


function isValidEmail(email) {
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
return emailRegex.test(email);
}

function isPasswordValid(password){
    //Returns true if the password is of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
