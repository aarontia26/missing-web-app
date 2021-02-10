// listen for auth
auth.onAuthStateChanged((userAccount) =>{
    if(userAccount){
        //console.log('user logged in', userAccount.email);
        window.location.assign('./profile.html')   
    }
})


const center = document.getElementById('center')
const popup = document.getElementById('popup')
const resetPass = document.getElementById('resetPass')

/*--------------FORGOT PASSWORD POP-UP---------------*/
document.getElementById('forgotbutton').addEventListener('click', function(){
    popup.style.display = 'initial';
    center.style.display = 'none';
})
document.getElementById('close').addEventListener('click', function(){
    popup.style.display = 'none'
    center.style.display = 'block'
})
resetPass.addEventListener('submit', (e)=>{
    e.preventDefault();
    const receivingEmail = document.getElementById('receivingEmail').value
    auth.sendPasswordResetEmail(receivingEmail).then(function(){
        alert('Reset password email sent!')
    }).catch(() =>{
        var conf = confirm('The email address provided is not yet registered. Need to register?')
        if(conf==true){
            window.location.assign('./register.html')
        }
    })
    resetPass.reset();
})


/*--------------SignUp with Email & Password---------------*/
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password).then(() => {
        //window.location.assign('./profile.html');
        //localStorage["userAccount"] = JSON.stringify(userAccount);
        //localStorage.setItem("typeOfAccount", "emailAccount");
        window.location.assign('./profile.html');
        //localStorage.setItem("userAccount", "userAccount");
        //localStorage.setItem("typeOfAccount", "email");
    },
    function(error){
        icon.setAttribute('class', 'fa fa-times-circle')
        icon.style.color = "red"
        messageShow.innerHTML = 'The email & password you’ve entered doesn’t match any account.'
        modalShow.click()
    });
    
})

// Sign In with Google
function googleSignIn(){
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then((userAccount) =>{
        
        //localStorage["userAccount"] = JSON.stringify(userAccount);
        localStorage.setItem("typeOfAccount", "googleAccount");
        window.location.assign('./profile.html');
        
    })
    .catch(error =>{
        console.error(error);
    })
}

// Sign In with Facebook
function facebookSignIn(){
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebookProvider).then((userAccount) =>{
        
        //localStorage["userAccount"] = JSON.stringify(userAccount);
        localStorage.setItem("typeOfAccount", "facebookAccount");
        window.location.assign('./profile.html');
    })
    .catch(error =>{
        console.error(error);
    });
}


/*
// Forgot Password
var x = document.createElement('BUTTON')
            x.id = "btn"
            x.innerHTML = "Forgot Password"
            document.body.appendChild(x)
            document.getElementById('btn').addEventListener('click', function(){
                var user = auth.currentUser;
                console.log(user.emailVerified)
                
                user.sendEmailVerification().then(function() {
                // Email sent.
                }).catch(function(error) {
                // An error happened.
                });
            
            })
            */