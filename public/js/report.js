// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const reportMissingForm = document.querySelector('#reportMissingForm')
const familyMembers = document.querySelector('#familyMembers')

const missingHeight = document.querySelector('#missingHeight')
const missingEyes = document.querySelector('#missingEyes')
const missingHair = document.querySelector('#missingHair')
const missingComplexion = document.querySelector('#missingComplexion')
const missingGender = document.querySelector('#missingGender')
const missingLastOutfit = document.querySelector('#missingLastOutfit')
const missingLastSeenPlace = document.querySelector('#missingLastSeenPlace')
const missingLastSeenDate = document.querySelector('#missingLastSeenDate')
const missingAdditionalInfo = document.querySelector('#missingAdditionalInfo')
const reportBtn = document.querySelector('#reportBtn')

const reportedImg = document.querySelector('#reportedImg')
const reportedNum = document.querySelector('#reportedNum')
const reportedStatus = document.querySelector('#reportedStatus')
const reportedName = document.querySelector('#reportedName')
const reportedAge = document.querySelector('#reportedAge')
const reportedGender = document.querySelector('#reportedGender')
const reportedAddress = document.querySelector('#reportedAddress')
const reportedHeight = document.querySelector('#reportedHeight')
const reportedEyes = document.querySelector('#reportedEyes')
const reportedHair = document.querySelector('#reportedHair')
const reportedComplexion = document.querySelector('#reportedComplexion')
const reportedLastOutfit = document.querySelector('#reportedLastOutfit')
const reportedLastSeenPlace = document.querySelector('#reportedLastSeenPlace')
const reportedLastSeenDate = document.querySelector('#reportedLastSeenDate')
const reportedContactNo = document.querySelector('#reportedContactNo')
const reportedContactPerson = document.querySelector('#reportedContactPerson')
const reportedAdditionalInfo = document.querySelector('#reportedAdditionalInfo')

const modalShow = document.querySelector('#modalShow')
const modalBody = document.querySelector('.modal-body')
const icon = document.querySelector('#icon')
const modalFooter = document.querySelector('.modal-footer')

const previousBtn = document.querySelector('#previousBtn')
const nextBtn = document.querySelector('#nextBtn')

var familyMemberArray = []
var familyMemberNum = 0
var currentReportFamilyMemberDisplay = 0
var familyMemberReported = []
var familyMemberReportedNum = 0
// listen for auth
auth.onAuthStateChanged((userAccount) =>{
    if(userAccount){
        const userUID = userAccount.uid;
        
        // GET FAMILY MEMBER'S REPORTED MISSING
        usersdata_(userAccount.uid)
        console.log(userAccount)
        async function usersdata_(uid){
            const userRef = db.collection('users').doc(uid);
            const userRef_ = await userRef.get();
            const docRef_ = db.collection('users').doc(uid).collection('missing')
            const doc_ = await docRef_.get()
            doc_.forEach(doc =>{
                memberData = doc.data()
                familyMemberReported[familyMemberReportedNum] = memberData
                familyMemberReportedNum++
            })
            console.log(familyMemberReportedNum)
            if(familyMemberReportedNum!=0){
                reportedNum.value = currentReportFamilyMemberDisplay+1
                reportedStatus.value = familyMemberReported[0].missingStatus
                reportedImg.src = familyMemberReported[0].imgUrl
                reportedName.value = familyMemberReported[0].name
                reportedAge.value = familyMemberReported[0].age
                reportedGender.value = familyMemberReported[0].gender
                reportedAddress.value = familyMemberReported[0].address
                reportedHeight.value = familyMemberReported[0].missingHeight
                reportedEyes.value = familyMemberReported[0].missingEyes
                reportedHair.value = familyMemberReported[0].missingHair
                reportedComplexion.value = familyMemberReported[0].missingComplexion
                reportedGender.value = familyMemberReported[0].missingGender
                reportedLastOutfit.value = familyMemberReported[0].missingLastOutfit
                reportedLastSeenPlace.value = familyMemberReported[0].missingLastSeenPlace
                reportedLastSeenDate.value = familyMemberReported[0].missingLastSeenDate
                reportedAdditionalInfo.value = familyMemberReported[0].missingAdditionalInfo
                reportedContactPerson.value = userRef_.data().firstname + " " + userRef_.data().lastname
                reportedContactNo.value = userRef_.data().phoneNo
                previousBtn.style.display = "none"
                if(familyMemberReportedNum==1){
                    nextBtn.style.display = "none"
                }
            }else{
                previousBtn.style.display = "none"
                nextBtn.style.display = "none"
            }
            
        }
        
        // GET FAMILY MEMBER'S DATA
        userdata(userAccount.uid)
        async function userdata(uid){
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
                //console.log(familyMembersData)
                // NEXT FAMILY MEMBER INFO
                nextBtn.addEventListener('click', ()=>{
                    if(currentReportFamilyMemberDisplay==familyMemberArray.length-1){
                        nextBtn.style.display = "none"
                    }else{
                        console.log(currentReportFamilyMemberDisplay, "INSIDE")
                        currentReportFamilyMemberDisplay++
                        
                    }
                    reportedNum.value = currentReportFamilyMemberDisplay+1
                    reportedStatus.value = familyMemberReported[currentReportFamilyMemberDisplay].missingStatus
                    reportedImg.src = familyMemberReported[currentReportFamilyMemberDisplay].imgUrl
                    reportedName.value = familyMemberReported[currentReportFamilyMemberDisplay].name
                    reportedAge.value = familyMemberReported[currentReportFamilyMemberDisplay].age
                    reportedGender.value = familyMemberReported[currentReportFamilyMemberDisplay].contactNo
                    reportedAddress.value = familyMemberReported[currentReportFamilyMemberDisplay].address
                    reportedHeight.value = familyMemberReported[currentReportFamilyMemberDisplay].missingHeight
                    reportedEyes.value = familyMemberReported[currentReportFamilyMemberDisplay].missingEyes
                    reportedHair.value = familyMemberReported[currentReportFamilyMemberDisplay].missingHair
                    reportedComplexion.value = familyMemberReported[currentReportFamilyMemberDisplay].missingComplexion
                    reportedGender.value = familyMemberReported[currentReportFamilyMemberDisplay].missingGender
                    reportedLastOutfit.value = familyMemberReported[currentReportFamilyMemberDisplay].missingLastOutfit
                    reportedLastSeenPlace.value = familyMemberReported[currentReportFamilyMemberDisplay].missingLastSeenPlace
                    reportedLastSeenDate.value = familyMemberReported[currentReportFamilyMemberDisplay].missingLastSeenDate
                    reportedAdditionalInfo.value = familyMemberReported[currentReportFamilyMemberDisplay].missingAdditionalInfo
                    
                    previousBtn.style.display = "block"
                    console.log(currentReportFamilyMemberDisplay, "HEHE")
                })
                // PREVIOUS FAMILY MEMBER INFO
                previousBtn.addEventListener('click', ()=>{
                    if(currentReportFamilyMemberDisplay==0){
                        previousBtn.style.display = "none"
                        console.log(currentReportFamilyMemberDisplay)
                    }else{
                        currentReportFamilyMemberDisplay--
                        
                        //currentNum = currentReportFamilyMemberDisplay
                        
                    }
                    reportedNum.value--
                    reportedStatus.value = familyMemberReported[currentReportFamilyMemberDisplay].missingStatus
                    reportedImg.src = familyMemberReported[currentReportFamilyMemberDisplay].imgUrl
                    reportedName.value = familyMemberReported[currentReportFamilyMemberDisplay].name
                    reportedAge.value = familyMemberReported[currentReportFamilyMemberDisplay].age
                    reportedGender.value = familyMemberReported[currentReportFamilyMemberDisplay].contactNo
                    reportedAddress.value = familyMemberReported[currentReportFamilyMemberDisplay].address
                    reportedHeight.value = familyMemberReported[currentReportFamilyMemberDisplay].missingHeight
                    reportedEyes.value = familyMemberReported[currentReportFamilyMemberDisplay].missingEyes
                    reportedHair.value = familyMemberReported[currentReportFamilyMemberDisplay].missingHair
                    reportedComplexion.value = familyMemberReported[currentReportFamilyMemberDisplay].missingComplexion
                    reportedGender.value = familyMemberReported[currentReportFamilyMemberDisplay].missingGender
                    reportedLastOutfit.value = familyMemberReported[currentReportFamilyMemberDisplay].missingLastOutfit
                    reportedLastSeenPlace.value = familyMemberReported[currentReportFamilyMemberDisplay].missingLastSeenPlace
                    reportedLastSeenDate.value = familyMemberReported[currentReportFamilyMemberDisplay].missingLastSeenDate
                    reportedAdditionalInfo.value = familyMemberReported[currentReportFamilyMemberDisplay].missingAdditionalInfo
                    
                    nextBtn.style.display = "block"
                    console.log(currentReportFamilyMemberDisplay, "HEHE1")
                })
                // REPORTING FAMILY MEMBER MISSING
                reportMissingForm.addEventListener('submit',  (e)=>{
                    e.preventDefault()
                    var memberSelected = {}
                    for(var i=0;i<familyMemberArray.length;i++){
                        if(familyMemberArray[i].name==(familyMembers.value)){
                            memberSelected = (familyMemberArray[i])
                        }
                    }
                    console.log(memberSelected)
                    
                    var data = {
                        missingStatus: "Not Found",
                        missingHeight: missingHeight.value,
                        missingEyes: missingEyes.value,
                        missingHair: missingHair.value,
                        missingComplexion: missingComplexion.value,
                        missingGender: missingGender.value,
                        missingLastOutfit: missingLastOutfit.value,
                        missingLastSeenPlace: missingLastSeenPlace.value,
                        missingLastSeenDate: missingLastSeenDate.value,
                        missingAdditionalInfo: missingAdditionalInfo.value
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

/*----------BACK TO TOP-----------*/

const topBtn = document.querySelector('.topBtn');

window.addEventListener('scroll',()=>{
    if (window.pageYOffset > 200) {
        topBtn.classList.add("active");
    } else {
        topBtn.classList.remove("active");
    }
});