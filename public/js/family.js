// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const store = firebase.storage()

const addForm = document.querySelector('#addForm')
const addImg = document.querySelector('#addImg')
const addUpload = document.querySelector('#addUpload')
const addUploadFile = document.querySelector('#addUploadFile')
const addName = document.querySelector('#addName')
const addAge = document.querySelector('#addAge')
const addContactNo = document.querySelector('#addContactNo')
const addAddress = document.querySelector('#addAddress')
const addSubmit = document.querySelector('#addSubmit')

const data_image = document.querySelector('#data_image')
const updateImg = document.querySelector('#updateImg')
const updateUploadFile = document.querySelector('#updateUploadFile')
const updateUpload = document.querySelector('#updateUpload')
const updateForm = document.querySelector('#updateForm')
const updateName = document.querySelector('#updateName')
const updateAge = document.querySelector('#updateAge')
const updateContactNo = document.querySelector('#updateContactNo')
const updateAddress = document.querySelector('#updateAddress')
const updateSubmit = document.querySelector('#updateSubmit')
const saveButton = document.querySelector('#saveButton')

const previousBtn = document.querySelector('#previousBtn')
const nextBtn = document.querySelector('#nextBtn')

const modalShow = document.querySelector('#modalShow')
const modalBody = document.querySelector('.modal-body')
const icon = document.querySelector('#icon')
const modalFooter = document.querySelector('.modal-footer')

var familyMemberName
var familyMembersNum = 0
var familyMembersData = []
var currentFamilyMemberDisplay = 0
var storageRef = store.ref()
var files
var ImgUrl
// listen for auth
auth.onAuthStateChanged((userAccount) =>{
    if(userAccount){
        const userUID = userAccount.uid
        // GET FAMILY MEMBERS DATA 
        usersdata(userAccount.uid)
        async function usersdata(uid){
            const docRef_ = db.collection('users').doc(uid).collection('familymembers')
            const doc_ = await docRef_.get()
            doc_.forEach(doc =>{
                //console.log(doc.id, '=>', doc.data())
                memberData = doc.data()
                familyMembersData[familyMembersNum] = memberData
                console.log(memberData)
                familyMembersNum++;
            })
            console.log(familyMembersNum)
            if(familyMembersNum!=0){
                updateImg.src = familyMembersData[0].imgUrl
                updateName.value = familyMembersData[0].name
                updateAge.value = familyMembersData[0].age
                updateContactNo.value = familyMembersData[0].contactNo
                updateAddress.value = familyMembersData[0].address
                previousBtn.style.display = "none"
                if(familyMembersNum==1){
                    nextBtn.style.display = "none"
                }
            }else{
                previousBtn.style.display = "none"
                nextBtn.style.display = "none"
                updateSubmit.disabled = true
            }
        }
        
        
        setTimeout(mem, 1500)
        function mem(){
            // UPLOAD PICTURE FOR ADDING FAMILY MEMBER
            addUpload.addEventListener('click', ()=>{
                addUploadFile.click()
                addUploadFile.onchange = e =>{
                    files = e.target.files;
                    imgName = files[0].name;
                    imgSize = files[0].size;
            
                    if(imgSize < 5000000){
                        reader = new FileReader();
                        reader.onload = function () {
                            addImg.src = reader.result;
                            console.log(files[0].name)
                        }
                        reader.readAsDataURL(files[0]);
                    }else{
                        alert("Image file is too big!");
                    }
                }
            })

            addForm.addEventListener('submit', (e)=>{
                e.preventDefault()
                var uploadTask
                if(files){
                    uploadTask = storageRef.child('Images/'+userAccount.uid+'/'+'familymembers'+'/'+addName.value.toLowerCase()).put(files[0])
                }else{
                    uploadTask = storageRef.child('Images/'+userAccount.uid+'/'+'familymembers'+'/'+addName.value.toLowerCase()).put()
                }
                
                uploadTask.on('state_changed', function(){
                },
                function(error){
                    alert(error)
                },
                function(){
                    uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                        ImgUrl = url
                        if(!files){
                            uploadTask = storageRef.child('Images/'+userAccount.uid+'/'+'familymembers'+'/'+addName.value.toLowerCase()).child('images/no-img.jpg')
                            ImgUrl = 'images/no-img.jpg'
                        }
                        var data = {
                            imgUrl: ImgUrl,
                            name: addName.value.toLowerCase(),
                            age: addAge.value.toLowerCase(),
                            contactNo: addContactNo.value,
                            address: addAddress.value.toLowerCase()
                        }
                        const docRef = db.doc("users"+"/"+userUID+"/"+"familymembers"+"/"+addName.value.toLowerCase())
                        docRef.set(data).then(function(){
                            console.log(data)
                        }).then(function(){ 
                            icon.setAttribute('class', 'fa fa-check-circle')
                            icon.style.color = "green"
                            icon.style.textAlign = "center"
                            messageShow.innerHTML = 'You have successfully added a family member!'
                            
                            setTimeout(click, 500)
                            function click(){
                                modalShow.click()         
                            }
                            $('#exampleModalCenter').on('hidden.bs.modal', function (e) { 
                                    location.reload()
                                })
                            
                        }).catch(error=>{
                            alert(error.message)
                        })
                    })
                })     
            })


            console.log(familyMembersData)
            // NEXT FAMILY MEMBER INFO
            nextBtn.addEventListener('click', ()=>{
                if(currentFamilyMemberDisplay==familyMembersData.length-1){
                    nextBtn.style.display = "none"
                }else{
                    console.log(currentFamilyMemberDisplay, "INSIDE")
                    currentFamilyMemberDisplay++
                }
                updateImg.src = familyMembersData[currentFamilyMemberDisplay].imgUrl
                updateName.value = familyMembersData[currentFamilyMemberDisplay].name
                updateAge.value = familyMembersData[currentFamilyMemberDisplay].age
                updateContactNo.value = familyMembersData[currentFamilyMemberDisplay].contactNo
                updateAddress.value = familyMembersData[currentFamilyMemberDisplay].address
                previousBtn.style.display = "block"
                console.log(currentFamilyMemberDisplay, "HEHE")
            })
            // PREVIOUS FAMILY MEMBER INFO
            previousBtn.addEventListener('click', ()=>{
                if(currentFamilyMemberDisplay==0){
                    previousBtn.style.display = "none"
                    console.log(currentFamilyMemberDisplay)
                }else{
                    currentFamilyMemberDisplay--
                }
                updateImg.src = familyMembersData[currentFamilyMemberDisplay].imgUrl
                updateName.value = familyMembersData[currentFamilyMemberDisplay].name
                updateAge.value = familyMembersData[currentFamilyMemberDisplay].age
                updateContactNo.value = familyMembersData[currentFamilyMemberDisplay].contactNo
                updateAddress.value = familyMembersData[currentFamilyMemberDisplay].address
                nextBtn.style.display = "block"
                console.log(currentFamilyMemberDisplay, "HEHE1")
            })
            // UPDATE FAMILY MEMBER INFO
            updateSubmit.addEventListener('click', ()=>{
                if(updateSubmit.innerHTML=="Cancel"){
                    location.reload()                
                }else{
                    familyMemberName=updateName.value
                    console.log(familyMemberName)
                    for(var i=0; i<updateForm.length-2; i++){
                        updateForm[i].readOnly = false                   
                    }
                    updateSubmit.innerHTML = "Cancel"
                    updateSubmit.style.marginRight = "10px"
                    updateContactNo.addEventListener('click', ()=>{
                    updateContactNo.value = "(+63)"
                    })
                    updateUpload.style.display = "initial"
                    data_image.style.marginBottom = "0px"
                    saveButton.hidden = false
                    saveButton.style.marginLeft = "10px"
                }
            })
            // UPLOAD PICTURE FOR UPDATE FAMILY MEMBER
            updateUpload.addEventListener('click', ()=>{
                updateUploadFile.click()
                updateUploadFile.onchange = e =>{
                    files = e.target.files;
                    imgName = files[0].name;
                    imgSize = files[0].size;

                    if(imgSize < 5000000){
                        reader = new FileReader();
                        reader.onload = function () {
                            updateImg.src = reader.result;
                            console.log(files[0].name)
                        }
                        reader.readAsDataURL(files[0]);
                    }else{
                        alert("Image file is too big!");
                    }
                }        
            })
            // SAVE UPDATED FAMILY MEMBER DATA
            saveButton.addEventListener('click', (e)=>{
                e.preventDefault()
                messageShow.innerHTML = ""
                icon.setAttribute('class', 'fa fa-question-circle')
                icon.style.color = "black"
                messageShow.append("Are you sure you want to save changes for " + '"'+
                    updateName.value + '"' + " ?")
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

                btn.addEventListener('click', ()=>{
                    var uploadTask
                    
                    var data={
                        imgUrl:updateImg.src,
                        name: updateName.value.toLowerCase(),
                        age: updateAge.value.toLowerCase(),
                        contactNo: updateContactNo.value,
                        address: updateAddress.value.toLowerCase()
                    };  
                    db.doc("users"+"/"+userUID+"/"+"familymembers"+"/"+familyMemberName).delete()                      
                    const docRef = db.doc("users"+"/"+userUID+"/"+"familymembers"+"/"+updateName.value.toLowerCase())
                    docRef.set(data).then(function(){
                        icon.setAttribute('class', 'fa fa-check-circle')
                        icon.style.color = "green"
                        messageShow.innerHTML = 'You have successfully updated your family member info'
                    }).catch(error=>{
                        alert(error.message)
                    })
                    if(files){
                        uploadTask = storageRef.child('Images/'+userAccount.uid+'/'+'familymembers'+'/'+updateName.value.toLowerCase()).put(files[0])
                        uploadTask.on('state_changed', function(){
                        },
                        function(error){
                            alert(error.message)
                        },

                        function(){
                            uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                                ImgUrl = url
                                var data = {imgUrl: ImgUrl}
                                docRef.update(data).then(function(){
                                    console.log('SUCCESSFULLY')
                                    setTimeout(1500)
                                }).catch(error=>{
                                    alert(error.message)
                                })
                            })
                        })
                    }
                    click()
                    function click(){
                        setTimeout(click_, 2000)
                    }
                    function click_(){
                        modalShow.click()
                        $('#exampleModalCenter').on('hidden.bs.modal', function () { 
                            updateSubmit.click()
                            location.reload()
                        })  
                    }                
                    setTimeout(modalShow.click(), 1500)
                    /*
                    setTimeout(click, 1000)
                    function click(){
                        addForm.reset()
                        modalShow.click()         
                    }       
                    */            
                })
                $('#exampleModalCenter').on('hidden.bs.modal', function () { 
                    
                    btn.remove()
                    console.log('GONE')
                })
            })
            

            console.log(familyMembersData[currentFamilyMemberDisplay], "HEHE")
        }
    }else{
        window.location.assign("./login-form.html")
    }
})

//--------------------------PHONE NO CHECKER--------------------------//
addContactNo.addEventListener('focus', ()=>{
    addContactNo.value = "(+63)"
})

const logout = document.querySelector('#logout')
logout.addEventListener('click', ()=>{
    auth.signOut().then(() => {
        window.location.assign('./login-form.html')
        localStorage.clear()
    })
})
