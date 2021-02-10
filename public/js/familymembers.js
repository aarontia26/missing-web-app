  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const store = firebase.storage()

const addForm = document.querySelector('.addForm')
const addImg = document.querySelector('#addImg')
const addUpload = document.querySelector('#addUpload')
const addUploadFile = document.querySelector('#addUploadFile')
const addName = document.querySelector('#addName')
const addAge = document.querySelector('#addAge')
const addPhoneNo = document.querySelector('#addPhoneNo')
const addAddress = document.querySelector('#addAddress')
const addSubmit = document.querySelector('#addSubmit')

const box2_inside = document.querySelector('.box2_inside')
const updateForm = document.querySelector('.updateForm')
const updateUpload = document.querySelector('#updateUpload')
const updateUploadFile = document.querySelector('#updateUploadFile')
const updateName = document.querySelector('#updateName')
const updateAge = document.querySelector('#updateAge')
const updatePhoneNo = document.querySelector('#updatePhoneNo')
const updateAddress = document.querySelector('#updateAddress')
//const updateSubmit = document.querySelector('#updateSubmit')


const modalShow = document.querySelector('#modalShow')
const modalBody = document.querySelector('.modal-body')
const icon = document.querySelector('#icon')
const modalFooter = document.querySelector('.modal-footer')

var familyMembersNum=0;
var familyMembersArray = []
var familyMemberName
var storageRef = store.ref()
var files
var files1
var ImgUrl
var memberData = {}
// listen for auth
auth.onAuthStateChanged((userAccount) =>{
    if(userAccount){
        const userUID = userAccount.uid;
        
        console.log(files)
        // GET FAMILY MEMBERS DATA 
        usersdata(userAccount.uid)
        async function usersdata(uid){
            const docRef_ = db.collection('users').doc(uid).collection('familymembers')
            const doc_ = await docRef_.get()
            doc_.forEach(doc =>{
                //console.log(doc.id, '=>', doc.data())
                memberData = doc.data()
                console.log(memberData)
                console.log(memberData["imgUrl"])
                familyMembersNum++;
                var div_  = document.createElement("div")
                div_.innerHTML = box2_inside.innerHTML
                div_.className = "familyMembersDiv"
                div_.id = "familyMembersNum" + familyMembersNum
                div_.querySelector('#updateImg').src = doc.data().imgUrl
                div_.querySelector('#updateName').value = doc.data().name
                div_.querySelector('#updateAge').value = doc.data().age
                div_.querySelector('#updatePhoneNo').value = doc.data().phoneNo
                div_.querySelector('#updateAddress').value = doc.data().address
                div_.style.marginBottom = "10px"
                document.querySelector('.box2').appendChild(div_)
                familyMembersArray.push(div_.id)

            })
        }
        
        setTimeout(mem, 1500)
        function mem(){
            familyMembersArray.forEach(item =>{
                const updateUploadMember = document.getElementById(item).querySelector('#updateUpload')
                const updateUploadFileMember = document.getElementById(item).querySelector('#updateUploadFile')
                const updateImg = document.getElementById(item).querySelector('#updateImg')
                const updateSubmitMember = document.getElementById(item).querySelector('#updateSubmit')
                const updateFormMember = document.getElementById(item).querySelector('.updateForm')
                const updateSaveButton = document.getElementById(item).querySelector('#saveButton')
                const updateName = document.getElementById(item).querySelector('#updateName')
                const updateAge = document.getElementById(item).querySelector('#updateAge')
                const updatePhoneNo = document.getElementById(item).querySelector('#updatePhoneNo')
                const updateAddress = document.getElementById(item).querySelector('#updateAddress')
                
                // UPDATE FAMILY MEMBER INFO
                updateSubmitMember.addEventListener('click', ()=>{
                    if(updateSubmitMember.innerHTML=="CANCEL"){
                        location.reload()
                        
                    }else{
                        console.log(item)
                        console.log(familyMembersNum2)
                        for(var i=0; i<familyMembersArray.length; i++){
                            if(item!=familyMembersArray[i]){
                                document.getElementById(familyMembersArray[i]).querySelector('.updateForm').
                                    querySelector('#updateSubmit').disabled = true
                            }
                        }
                        familyMemberName=updateName.value
                        console.log(familyMemberName)
                        for(var i=0; i<updateFormMember.length-2; i++){
                            updateFormMember[i].readOnly = false                   
                        }
                        updateSubmitMember.innerHTML = "CANCEL"
                        updatePhoneNo.addEventListener('click', ()=>{
                            updatePhoneNo.value = "(+63)"
                        })
                        updateUploadMember.style.display = "block"
                        updateSaveButton.hidden = false
                    }
                })
                // UPLOAD PICTURE FOR UPDATE FAMILY MEMBER
                updateUploadMember.addEventListener('click', ()=>{
                    updateUploadFileMember.click()
                    updateUploadFileMember.onchange = e =>{
                        files1 = e.target.files;
                        imgName = files1[0].name;
                        imgSize = files1[0].size;
    
                        if(imgSize < 5000000){
                            reader = new FileReader();
                            reader.onload = function () {
                                updateImg.src = reader.result;
                                console.log(files1[0].name)
                            }
                            reader.readAsDataURL(files1[0]);
                        }else{
                            alert("Image file is too big!");
                        }
                    }        
                })
            
                // SAVE UPDATED FAMILY MEMBER DATA

                updateSaveButton.addEventListener('click', (e)=>{
                    e.preventDefault()
                    messageShow.innerHTML = ""
                    icon.setAttribute('class', 'fa fa-question-circle')
                    icon.style.color = "black"
                    messageShow.append("Are you sure you want to save changes for " + '"'+
                    document.getElementById(item).querySelector('#updateName').value + '"' + " ?")
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
                            imgUrl:document.getElementById(item).querySelector('.img-container').querySelector('#updateImg').src,
                            //imgUrl:document.getElementById(memberDataSelected).src,
                            name: updateName.value.toLowerCase(),
                            age: updateAge.value.toLowerCase(),
                            phoneNo: updatePhoneNo.value,
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
                        if(files1){
                            uploadTask = storageRef.child('Images/'+userAccount.uid+'/'+'familymembers'+'/'+updateName.value.toLowerCase()).put(files1[0])
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
                                updateSubmitMember.click()
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
            })
          
        }
        
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
        
        // ADD FAMILY MEMBER DATA
        addPhoneNo.addEventListener('click', ()=>{
            addPhoneNo.value = "(+63)"
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
                        phoneNo: addPhoneNo.value,
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
        
    }else{
        window.location.assign("./login-form.html")
    }
})

const logout = document.querySelector('#logout')
logout.addEventListener('click', ()=>{
    auth.signOut().then(() => {
        window.location.assign('./login-form.html')
        localStorage.clear()
    })
})




