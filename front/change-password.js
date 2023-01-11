$(document).ready( () => {
    addEventListeners();
})
function addEventListeners(){
    $(".form-control").on("keypress",inputFlow);    
    $("#login").on("click",login);
    formSubmitListener();
}

function togglePW(){
    let password = document.getElementById("password");
    let toggle = document.getElementById("show-password");
    if(password.type == "password"){
        password.type="text";
        toggle.title = "Hide password"
    }
    else{
        password.type="password";
        toggle.title="Show password";
    }
}


function formSubmitListener(){
    // Get the form input values
    
    $("#login-form").on("submit", (e) =>{
        e.preventDefault()
    let user_email = document.getElementById("password").value;
    console.log(user_email)
    if(!isValidEmail(user_email)){
        alert("Invalid email address format");
        return;
    }
    else{
        let user_password = document.getElementById("password").value;
        sendPOSTRequestlogin(user_password);
    }
    });

    $("#forgot-password-form").on("submit", (e) =>{
        e.preventDefault()
    let user_email1 = document.getElementById("forgot-pass").value;
    if(!isValidEmail(user_email1)){
        alert("Invalid email address format");
        return;
    }else
        sendPOSTRequestfogotpas(user_email1);
    });

}
function login() {
    $("#login-form").submit();
  }
function sendEmail() {
    $("#forgot-password-form").submit();
}

function sendPOSTRequestlogin(user_email, user_password) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/login',
        data: {
            user_email: user_email,
            password: user_password
        },
        success: function(response) {
            if (response.result == 'redirect') window.location.replace("http://localhost:8080" + response.url);
            else{
                alert(response.error);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function sendPOSTRequestfogotpas(user_email) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/forgot-password',
        data: {
            user_email: user_email
        },
        success: function(response) {
            alert(response.message)
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function isValidEmail(user_email) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(user_email);
}
