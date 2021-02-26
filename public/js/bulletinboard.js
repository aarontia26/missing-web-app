// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const modalShow = document.querySelector('#modalShow')
const modalBody = document.querySelector('.modal-body')
const seenButton = document.querySelector('#seenButton')
const seenSubmit = document.querySelector('#seenSubmit')
const second = document.querySelector('.second')

const rowImg = document.querySelector('#rowImg')
const title = document.querySelector('.title')
const missingInfo = document.querySelector('.missingInfo')
const box_inside = document.querySelector('.box_inside')
const img_container = document.querySelector('.img_container')
const infoHidden = document.querySelector('.infoHidden')
const formHidden = document.querySelector('.formHidden')
const nameSeener = document.querySelector('#nameSeener')
const contactNoSeener = document.querySelector('#contactNoSeener')
const lastSeenSeener = document.querySelector('#lastSeenSeener')
const lastDateSeener = document.querySelector('#lastDateSeener')
const addInfoSeener = document.querySelector('#addInfoSeener')
const submitFind = document.querySelector('#submitFind')

var missingPersonsNum = 0
var missingPersonsArrayNum = []
var missingPersonsArray = []
var missingPersonsImg = []

// listen for auth
auth.onAuthStateChanged((userAccount) =>{
    if(userAccount){
        const userUID = userAccount.uid;
        
        getMissingPersonsData(userUID)
        async function getMissingPersonsData(userUID) {
            const userRef = db.collection('users').doc(userUID);
            const userRef_ = await userRef.get();
            const docRef = db.collection('missingPersons')
            const doc = await docRef.get()
            doc.forEach(doc =>{
                //console.log(doc.id, '=>', doc.data())
                memberData = doc.data()
                missingPersonsArray[missingPersonsNum] = memberData
                //console.log(memberData)
                
                //console.log(memberData)
                //console.log(memberData["imgUrl"])
                var div_  = document.createElement("div")
                div_.innerHTML = missingInfo.innerHTML
                div_.className = "missingPersonDiv"
                div_.id = "missingPerson" + missingPersonsNum
                div_.style.display = "none"
                //console.log(div_)
                div_.querySelector('#reportedName').value = missingPersonsArray[missingPersonsNum].name
                div_.querySelector('#reportedAge').value = missingPersonsArray[missingPersonsNum].age
                div_.querySelector('#reportedGender').value = missingPersonsArray[missingPersonsNum].contactNo
                div_.querySelector('#reportedAddress').value = missingPersonsArray[missingPersonsNum].address
                div_.querySelector('#reportedHeight').value = missingPersonsArray[missingPersonsNum].missingHeight
                div_.querySelector('#reportedEyes').value = missingPersonsArray[missingPersonsNum].missingEyes
                div_.querySelector('#reportedHair').value = missingPersonsArray[missingPersonsNum].missingHair
                div_.querySelector('#reportedComplexion').value = missingPersonsArray[missingPersonsNum].missingComplexion
                div_.querySelector('#reportedGender').value = missingPersonsArray[missingPersonsNum].missingGender
                div_.querySelector('#reportedLastOutfit').value = missingPersonsArray[missingPersonsNum].missingLastOutfit
                div_.querySelector('#reportedLastSeenPlace').value = missingPersonsArray[missingPersonsNum].missingLastSeenPlace
                div_.querySelector('#reportedLastSeenDate').value = missingPersonsArray[missingPersonsNum].missingLastSeenDate
                div_.querySelector('#reportedAdditionalInfo').value = missingPersonsArray[missingPersonsNum].missingAdditionalInfo.charAt(0).toUpperCase() + missingPersonsArray[missingPersonsNum].missingAdditionalInfo.slice(1)
                div_.querySelector('#reportedContactPerson').value = missingPersonsArray[missingPersonsNum].missingContactPerson
                div_.querySelector('#reportedContactNo').value = missingPersonsArray[missingPersonsNum].missingContactNo
                
                //div_.style.marginBottom = "10px"
                modalBody.appendChild(div_)
                missingPersonsArrayNum.push(div_.id)
                
                var divImg = document.createElement("div")
                var divTitle = document.createElement("div")
                divTitle.innerHTML = title.innerHTML
                divTitle.className = "title"
                divImg.innerHTML =  img_container.innerHTML
                divImg.className = "col-md-3 col-sm-6"
                divImg.id = "missingPersonImg" + missingPersonsNum
                divImg.style.marginBottom = "20px"
                divImg.style.display = "block"
                divImg.querySelector('#imgReported').src = doc.data().imgUrl
                rowImg.appendChild(divImg)    
                missingPersonsImg.push(divImg.id)
                missingPersonsNum++
            })
        }
        
        setTimeout(mem, 1500)
        function mem(){
            //console.log(missingPersonsArray[1])
            //console.log(missingPersonsImg)
            //console.log(missingPersonsArrayNum)
            for(let i=0;i<missingPersonsArray.length;i++){
                console.log(document.getElementById(missingPersonsArrayNum[i]))
            }
            missingPersonsImg.forEach(item=>{
                
                const imgReported = document.getElementById(item).querySelector('#imgReported')
                imgReported.addEventListener('click', ()=>{
                    //console.log("CLICK " + item)
                    const missingPersonImgSelected = item.substring(16)
                    //console.log("IMG", missingPersonImgSelected)
                    
                    for(let i=0;i<missingPersonsArray.length;i++){
                        const missingPersonSelected = missingPersonsArrayNum[i].substring(13)
                        console.log("PERSON", missingPersonSelected)
                        if(missingPersonSelected==missingPersonImgSelected){
                            document.getElementById(missingPersonsArrayNum[i]).style.display = "block"
                            document.getElementById(missingPersonsArrayNum[i]).querySelector('.third').style.display = "block"

                            seenButton.addEventListener('click', ()=>{
                                
                                if(seenButton.innerHTML=="CANCEL"){
                                    seenSubmit.style.display = "none"
                                    seenButton.innerHTML="HAVE YOU SEEN ME?"
                                    formHidden.style.display = "none"
                                    //submitFind.click()
                                }else{
                                    console.log("PINDOT")
                                    formHidden.style.display = "block"
                                    seenButton.innerHTML="CANCEL"
                                    seenSubmit.style.display = "block"
                                }        
                            })
                            seenSubmit.addEventListener('click', ()=>{
                                console.log(missingPersonSelected)
                                submitFind.click()
                            })
                            second.addEventListener('submit', (e)=>{
                                e.preventDefault()
                                console.log(missingPersonSelected)
                                
                                console.log(nameSeener.value)
                                console.log(contactNoSeener.value)
                                console.log(lastSeenSeener.value)
                                console.log(lastDateSeener.value)
                                console.log(addInfoSeener.value)
                                second.reset()
                            })
                            //console.log("MATHCED",missingPersonsArray[i])
                        }
                    }

                    modalShow.click()
                    $('#exampleModalCenter').on('hidden.bs.modal', function (e) { 
                        missingPersonsArrayNum.forEach(item1=>{
                            document.getElementById(item1).style.display = "none"
                            document.getElementById(item1).querySelector('.third').style.display = "none"
                        })
                        seenSubmit.style.display = "none"
                        seenButton.innerHTML="HAVE YOU SEEN ME?"
                        formHidden.style.display = "none"
                    })
                })
            })
            
        }
    }else{
        window.location.assign('./login-form.html')
    }
})

const logout = document.querySelector('#logout')
logout.addEventListener('click', ()=>{
    auth.signOut().then(() => {
        window.location.assign('./login-form.html')
        localStorage.clear()
    })
})