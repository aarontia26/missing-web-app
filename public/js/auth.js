




// SignUp with Google
const googleSignUp = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then((userAccount) =>{
        
        //localStorage["userAccount"] = JSON.stringify(userAccount);
        //localStorage.setItem("typeOfAccount", "googleAccount");
        window.location.assign('./profile.html');
        
    })
    .catch(error =>{
        console.error(error);
    })
}

// SignUp with Facebook
const facebookSignUp = () =>{
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebookProvider).then((userAccount) =>{
        
        //localStorage["userAccount"] = JSON.stringify(userAccount);
        //localStorage.setItem("typeOfAccount", "facebookAccount");
        window.location.assign('./profile.html');
        console.log(userAccount);
    })
    .catch(error =>{
        console.error(error);
    });
}




/*
//--------------------------SEE PASSWORD--------------------------//
const seePassword = document.querySelector("input[id=seePassword]");
seePassword.addEventListener('change', function(){
    var x = document.getElementById('password');
    if(this.checked){
        x.type = "text";
    }else{
        x.type = "password";
    }
})

*/