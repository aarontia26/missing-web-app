
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

//--------------------------PASSWORD CHECKER--------------------------//
const password1 = document.getElementById('password1')
const password2 = document.getElementById('password2')

var arr = [password1, password2]
arr.forEach(function(passwordElement){
    passwordElement.addEventListener('change',() =>{
        if(password1.value&&password2.value){
            if(password1.value!=password2.value){
                password1.focus();
                password1.style.border = "solid"
                password2.style.border = "solid"
                password1.style.borderColor = "red"
                password2.style.borderColor = "red"
                var msg = "Password must be the same!"
                passMsg.style.display = "block"
                passMsg.innerHTML = msg
                passMsg.style.color = "red"
            }
        }
    })
});

//--------------------------PHONE NO CHECKER--------------------------//
const phoneNo = document.getElementById('phoneNo')
phoneNo.addEventListener('focus', ()=>{
    phoneNo.value = "(+63) "
})

// SignUp with Google

const googleSignUp = () =>{
   
    
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then((userAccount) =>{
        
        localStorage["userAccount"] = JSON.stringify(userAccount);
        localStorage.setItem("typeOfAccount", "googleAccount");
        window.location.assign('./profile.html');
        console.log(userAccount)
    })
    .catch(error =>{
        console.error(error);
    })
    
}

// SignUp with Facebook
const facebookSignUp = () =>{
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebookProvider).then((userAccount) =>{
        
        localStorage["userAccount"] = JSON.stringify(userAccount);
        localStorage.setItem("typeOfAccount", "facebookAccount");
        window.location.assign('./profile.html');
        console.log(userAccount);
    })
    .catch(error =>{
        console.error(error);
    });
}


//--------------------------SUBMIT PROCESS--------------------------//
const regiForm = document.querySelector('#regiForm');
regiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    

    // get user info
    
    const firstName = document.getElementById('fName').value;   
    const lastName = document.getElementById('lName').value;
    const birthdate = document.getElementById('birthdate').value.toString();
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;;
    const password1 = document.getElementById('password1')
    const password2 = document.getElementById('password2')
    
    console.log(firstName, lastName, birthdate, address, email, phoneNo, gender)
    if(password1.value==password2.value){   

        const passMsg = document.getElementById('passMsg')
                arr.forEach(function(change){
                    change.style.border = "none"
                })
                passMsg.style.display = "none"
                console.log("HEHE")

        
        // register the user
        auth.createUserWithEmailAndPassword(email, password1.value).then((userAccount) =>{
            const userUID = userAccount.user.uid;
            console.log(userUID, 'hehe')
            //get data
            const docRef = db.doc("users"+"/"+userUID);
            docRef.set({
                email: email,
                password: password1.value,
                firstname: firstName,
                lastname: lastName,
                gender: gender,
                address: address,
                birthdate: birthdate,
                phoneNo: phoneNo,
                profileImg: 'images/no-img.jpg'

    
            }).then(function(){
                setTimeout(click_, 1000)
                function click_(){                 
                    document.querySelector('#modalShow').click()
                    auth.signOut()
                }  
                
            }).catch(function(error){
                console.log(error.message)
                
            })   
            regiForm.reset();      
        },
        function(error){
            
            alert(error.message);
        });
        
    }else{
        password1.focus();
    }
});




    