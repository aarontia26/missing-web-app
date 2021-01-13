  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// get document element 
const fName = document.getElementById('fName')
const lName = document.getElementById('lName')
const gender = document.getElementById('gender')
const birthdate = document.getElementById('birthdate')
const address = document.getElementById('address')
const email = document.getElementById('email')
const phoneNo = document.getElementById('phoneNo')
const password = document.getElementById('password')
const profileImg = document.getElementById('profileImg')
const discardButton = document.getElementById('discardButton')
const uploadButton = document.getElementById('uploadButton')
const uploadButtonFile = document.getElementById('uploadButtonFile')
const updateButton = document.getElementById('updateButton')
const saveButton = document.getElementById('saveButton')
const profileForm = document.querySelector('#profileForm')
const messageShow = document.querySelector('#messageShow')
const modalShow = document.querySelector('#modalShow')
const modalBody = document.querySelector('.modal-body')
const icon = document.getElementById('icon')
const modalFooter = document.querySelector('.modal-footer')
var modal = document.querySelector('#exampleModalCenter')
var message
var files


// listen for auth
auth.onAuthStateChanged((userAccount) =>{
    if(userAccount){
        console.log(userAccount)
        console.log('user logged in', userAccount.email);

        const user = auth.currentUser
        usersdata(userAccount.uid)
        
        // get user data from firestore
        async function usersdata(uid){
            const docRef = db.collection('users').doc(uid);
            const doc = await docRef.get();
            if(localStorage.getItem("typeOfAccount", "googleAccount")){
                document.querySelector('#passwordDiv').style.display = "none"
            }
            if (!doc.exists) { 
                console.log('Account Error!');
                console.log(userAccount)
                profileImg.value = (userAccount.photoURL)
                email.value = userAccount.email;
                const userUID = userAccount.uid;
                
                const docRef = db.doc("users"+"/"+userUID);
                var not = "Not set"
                docRef.set({
                    email:userAccount.email,
                    firstname:not,
                    lastname:not,
                    gender:not,
                    address:not,    
                    birthdate:"",
                    phoneNo:not,
                    password:not,
                    profileImg: userAccount.photoURL

                }).then(()=>{
                                 
                if(!messageShow.innerHTML.includes('Setup your account.')){
                    //messageShow.innerHTML = 'Tap Update profile to change you info.'
                    modalShow.click()
                    messageShow.append('Setup your account.') 
                    var br = document.createElement('br')
                    messageShow.append(br)
                    var br = document.createElement('br')
                    messageShow.append(br)
                    var br = document.createElement('br')
                    messageShow.append('Tap Update Profile to set your info.')
                    var br = document.createElement('br')   
     
                }
                 
                    //location.reload
                })
                   
                                
                /*if(modal.style.display="block"){

                    console.log('CHANGE')
                }
                */   
               $('#exampleModalCenter').on('hidden.bs.modal', function (e) { 
                location.reload()
                })                 
            }
            else {
            console.log('Document data:', doc.data());
            const DATA = doc.data();
            
            fName.value = (DATA.firstname).charAt(0).toUpperCase() + (DATA.firstname).slice(1)
            lName.value = (DATA.lastname).charAt(0).toUpperCase() + (DATA.lastname).slice(1)
            gender.value = (DATA.gender).charAt(0).toUpperCase() + (DATA.gender).slice(1)
            birthdate.value = DATA.birthdate
            address.value = DATA.address
            email.value = DATA.email
            phoneNo.value = DATA.phoneNo
            password.value = DATA.password
            profileImg.src = DATA.profileImg

            }
        }

        // change profile image
        uploadButton.addEventListener('click', ()=>{
            uploadButtonFile.click()
            uploadButtonFile.onchange = e =>{
                files = e.target.files;
                imgName = files[0].name;
                imgSize = files[0].size;
                //var ext = imgName.substr(imgName.lastIndexOf('.') + 1);
                //var extAllowed = ["png", "jpg", "jpeg"];
        
                if(imgSize < 5000000){
                    reader = new FileReader();
                    reader.onload = function () {
                        profileImg.src = reader.result;
                        console.log(files[0].name)
                    }
                    reader.readAsDataURL(files[0]);
                }else{
                    alert("Image file is too big!");
                }                  
                
            }
        })
        
        // update profile
        updateButton.addEventListener('click', ()=>{
        
            if(updateButton.innerHTML=="Discard Changes"){
                profileForm.reset();
                usersdata(userAccount.uid)
                
                for(var i=0; i<profileForm.length-4; i++){
                    
                    profileForm[i].readOnly = true 
                }             
                updateButton.innerHTML = "Update Profile"
                uploadButton.style.display = "none"
                saveButton.hidden = true
                files = ""
                console.log('files', files)
                console.log('discard')
                
            }else{         
                for(var i=0; i<profileForm.length-4; i++){
                    profileForm[i].readOnly = false                   
                }
                updateButton.innerHTML = "Discard Changes"
                phoneNo.addEventListener('click', ()=>{
                    phoneNo.value = "(+63) "
                })
                uploadButton.style.display = "block"
                saveButton.hidden = false
                
            }   
        })
        //console.log(modal.getAttribute('class'), 'HAHAHAHAHA')
        // save changes
        saveButton.addEventListener('click', (e)=>{
            e.preventDefault()
            var conf
            messageShow.innerHTML = ""
            icon.setAttribute('class', 'fa fa-question-circle')
            icon.style.color = "black"
            messageShow.append("Are you sure you want to save changes?")
            var br = document.createElement('br')
            messageShow.append(br)  
            var br = document.createElement('br')
            messageShow.append(br)
            modalBody.style.textAlign = "center"
            var btn = document.createElement('button')
            btn.setAttribute('class', 'btn btn-primary')
            btn.innerHTML = "Yes"
            modalFooter.style.display = "flex"
            modalFooter.style.flexDirection = "row-reverse"
            btn.style.marginRight = "10px"
            modalFooter.appendChild(btn)
            
            modalShow.click()
            //const modalYes = document.querySelector('.btn btn-primary')
            btn.addEventListener('click', ()=>{      
                if(files){
                    var uploadTask = store.ref('Images/'+userAccount.uid).put(files[0])
                    uploadTask.on('state_changed', function(){
                         
                    },
                    function(error){
                        alert('ERROR')
                    },
                    function(){
                        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                            ImgUrl = url
                            var data = {profileImg:ImgUrl}
                            const docRef = db.doc("users"+"/"+userAccount.uid)
                            docRef.update(data).then(function(){
                                console.log(data)
                            }).catch(error=>{
                                alert(error.message)
                            })
                        })
                    })      
                }
                var data={
                    firstname: fName.value,
                    lastname: lName.value,
                    gender: gender.value,
                    birthdate: birthdate.value,
                    address: address.value,
                    phoneNo: phoneNo.value,

                };                             
                const docRef = db.doc("users"+"/"+userAccount.uid)
                docRef.update(data).then(function(){
                    //var icon = document.createElement('i')
                    icon.setAttribute('class', 'fa fa-check-circle')
                    icon.style.color = "green"
                    messageShow.innerHTML = 'You have successfully updated your profile!'
                    
                }).catch(error=>{
                    alert(error.message)
                })
                click()
                function click(){
                    var var_ = setTimeout(click_, 1500)
                }
                function click_(){
                    modalShow.click()
                    $('#exampleModalCenter').on('hidden.bs.modal', function () { 
                        updateButton.click()
                    })  
                }                
                setTimeout(modalShow.click(), 1500)
                    
                
            })
            $('#exampleModalCenter').on('hidden.bs.modal', function () { 
                
                btn.remove()
                console.log('GONE')
            })

            /*
            //var conf = confirm("Are you sure you want to save changes?")
            if(conf==true){

                
                console.log(files)
                if(files){
                    var uploadTask = store.ref('Images/'+userAccount.uid).put(files[0])
                    uploadTask.on('state_changed', function(){
                         
                    },
                    function(error){
                        alert('ERROR')
                    },
                    function(){
                        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                            ImgUrl = url
                            var data = {profileImg:ImgUrl}
                            const docRef = db.doc("users"+"/"+userAccount.uid)
                            docRef.update(data).then(function(){
                                console.log(data)
                            }).catch(error=>{
                                alert(error.message)
                            })
                        })
                    })      
                }
                var data={
                    firstname: fName.value,
                    lastname: lName.value,
                    gender: gender.value,
                    birthdate: birthdate.value,
                    address: address.value,
                    phoneNo: phoneNo.value,

                };                             
                const docRef = db.doc("users"+"/"+userAccount.uid)
                docRef.update(data).then(function(){
                    messageShow.innerHTML = ""
                    var icon = document.createElement('i')
                    icon.setAttribute('class', 'fa fa-check-circle')
                    modalBody.appendChild(icon)
                    messageShow.innerHTML = 'You have successfully updated your profile'
                    modalBody.style.textAlign = "center"
                    modalBody.style.display ="flex"
                    modalBody.style.flexDirection = "column-reverse"
                    

                }).catch(error=>{
                    alert(error.message)
                })
                click()
                function click(){
                    var var_ = setTimeout(click_, 2000)
                }
                function click_(){
                    modalShow.click()
                }
                $('#exampleModalCenter').on('hidden.bs.modal', function (e) { 
                    location.reload()
                })
                
                setTimeout(modalShow.click(), 2000)
                $('#exampleModalCenter').on('hidden.bs.modal', function (e) { 
                    location.reload()
                })           
                
            }*/         
        })
        
        if(uploadButton.innerHTML=="Discard Changes"){
                        updateButton.addEventListener('click', ()=>{
                            files = ""
                            console.log('files', files)
                            console.log('discard')
                        })
                    } 
                    
        // discard profile picture
        discardButton.addEventListener('click', ()=>{
            var uploadTask = store.ref('Images/'+userAccount.uid+"/")
              
                        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                            files = ""
                            console.log('discard')
                            }).catch(error=>{
                                alert(error.message)
                            })
                        })
        
        // checking for verification of profile email address
        const verifyIcon = document.querySelector('#verifyIcon')
        const verifyCheck = document.querySelector('#verifyCheck')
        const verifySend = document.querySelector('#verifySend')
        if(!user.emailVerified){
            verifyIcon.className = "fa fa-times-circle-o"
            verifyIcon.style.color = "red"
            verifyCheck.style.color = "red"
            verifyCheck.innerHTML = " Not Verified"
            verifySend.style.display = "block"
            verifySend.innerHTML = "Click here to verify your email"
            icon.setAttribute('class', 'fa fa-exclamation-circle')
            icon.style.color = "red"
            modalBody.style.textAlign = "center"
            modalShow.click()
            messageShow.append("Your email is not verified!")
            var br = document.createElement('br')
            messageShow.append(br)
            var br = document.createElement('br')
            messageShow.append("Please verify your email address.")
            var br = document.createElement('br')
            messageShow.append(br)
            var br = document.createElement('br')
            messageShow.append(br)
            //messageShow.innerHTML = 'Tap Update profile to change you info.'
                   
            verifySend.addEventListener('click', ()=>{
                      
                var user = auth.currentUser;
                console.log(user.emailVerified)
                
                user.sendEmailVerification().then(function() {
                    // Email sent.
                    //messageShow.innerHTML = 'Tap Update profile to change you info.'
                    messageShow.innerHTML = ""
                    icon.setAttribute('class', 'fa fa-envelope-o')
                    icon.style.color = "green"
                    messageShow.append("We've sent you a link to confirm your email address. Please check your inbox.")
                    var br = document.createElement('br')
                    messageShow.append(br)
                    modalBody.style.textAlign = "center"
                    modalShow.click()     
                    $('#exampleModalCenter').on('hidden.bs.modal', function (e) { 
                        messageShow.innerHTML = ""
                        })    
                }).catch(function(error) {
                    alert(error.message)
                // An error happened.
                });
                
            })
            
        }else{
            verifyIcon.className = "fa fa-check-circle-o"
            verifyIcon.style.color = "green"
            verifyCheck.style.color = "green"
            verifyCheck.innerHTML = " Verified"
            verifySend.style.display = "none"
        }
        if(message){
            modalShow.click()
            console.log('WACHUU')
        }
    }else{
        window.location.assign("./login-form.html")
    }
})


const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.assign('./login-form.html');
        localStorage.clear();
    });
   
});
