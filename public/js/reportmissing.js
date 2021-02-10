  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const box2_inside = document.querySelector('.box2_inside')

var familyMembersNum = 0
var familyMemberArray = []
const familyMembers = document.querySelector('#familyMembers')
const reportingDetails = document.querySelector('#reportingDetails')
const lastSeen = document.querySelector('#lastSeen')
const lastDate = document.querySelector('#lastDate')
const lastOutfit = document.querySelector('#lastOutfit')
const report = document.querySelector('#report')


// listen for auth
auth.onAuthStateChanged((userAccount) =>{
    if(userAccount){
        const userUID = userAccount.uid;
        
        
        
        // GET FAMILY MEMBER'S REPORTED MISSING
        usersdata_(userAccount.uid)
        async function usersdata_(uid){
            
            var familyMembersArray = []
            const docRef_ = db.collection('users').doc(uid).collection('missing')
            const doc_ = await docRef_.get()
            doc_.forEach(doc =>{
                //console.log(doc.id, '=>', doc.data())
                memberData = doc.data()
                //console.log(memberData["imgUrl"])
                familyMembersNum++;
                console.log(familyMembersNum)
                var div_  = document.createElement("div")
                div_.innerHTML = box2_inside.innerHTML
                div_.className = "familyMembersDiv"
                div_.id = "familyMembersNum" + familyMembersNum
                div_.querySelector('#updateImg').src = doc.data().imgUrl
                div_.querySelector('#nameReported').value = doc.data().name
                div_.querySelector('#ageReported').value = doc.data().age
                div_.querySelector('#phoneNoReported').value = doc.data().phoneNo
                div_.querySelector('#addressReported').value = doc.data().address
                div_.querySelector('#lastSeenReported').value = doc.data().lastSeen
                div_.querySelector('#lastDateReported').value = doc.data().lastDate
                div_.querySelector('#lastOutfitReported').value = doc.data().lastOutfit
                div_.style.marginBottom = "10px"
                document.querySelector('.box2').appendChild(div_)
                familyMembersArray.push(div_.id)

            })
        }
        // GET FAMILY MEMBERS DATA 
        usersdata(userAccount.uid)
        async function usersdata(uid){
            const docRef_ = db.collection('users').doc(uid).collection('familymembers')
            const doc_ = await docRef_.get()
            doc_.forEach(doc =>{
                //console.log(doc.id, '=>', doc.data())
                //familyMemberArray = doc.data()
                familyMemberArray.push(doc.data())
            })
            console.log(familyMemberArray)
            // ADDING FAMILY MEMBERS NAME TO SELECT (DROPDOWN)
            setTimeout(mem, 1000)
            function mem(){
                familyMemberArray.forEach(item =>{
                    var option = document.createElement("OPTION")
                    option.innerHTML = item.name
                    familyMembers.add(option)           
                })
                // REPORTING FAMILY MEMBER MISSING
                report.addEventListener('submit', (e)=>{
                    e.preventDefault()
                    var memberSelected = {}
                    for(var i=0;i<familyMemberArray.length;i++){
                        if(familyMemberArray[i].name==(familyMembers.value)){
                            memberSelected = (familyMemberArray[i])
                        }
                    }
                    console.log(memberSelected)
                    
                    var data = {
                        lastSeen: lastSeen.value,
                        lastDate: lastDate.value,
                        lastOutfit: lastOutfit.value
                    }
                    Object.assign(data, memberSelected)
                    
                    const docRef = db.doc("users"+"/"+userUID+"/"+"missing"+"/"+memberSelected.name)
                    docRef.set(data).then(function(){
                        console.log(data)
                    }).then(function(){
                        const docRef1 = db.doc("missingPersons"+"/"+memberSelected.name)
                        docRef1.set(data).then(function(){
                        }).catch(error=>{
                            alert(error.message)
                        })
                        icon.setAttribute('class', 'fa fa-check-circle')
                        icon.style.color = "red"
                        icon.style.textAlign = "center"
                        messageShow.innerHTML =  memberSelected.name.toUpperCase() + " has been reported missing!"
                        
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
            }
        }
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