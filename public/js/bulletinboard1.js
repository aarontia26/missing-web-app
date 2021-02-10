  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const modalShow = document.querySelector('#modalShow')
const modalBody = document.querySelector('.modal-body')
const seenButton = document.querySelector('#seenButton')
const seenSubmit = document.querySelector('#seenSubmit')
const seenForm = document.querySelector('#seenForm')

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
var missingPersonsArray = []
var missingPersonsImg = []
// listen for auth
auth.onAuthStateChanged((userAccount) =>{
    if(userAccount){
        const userUID = userAccount.uid;
        
        getMissingPersonsData()
        async function getMissingPersonsData() {
            const docRef = db.collection('missingPersons')
            const doc = await docRef.get()
            doc.forEach(doc =>{
                //console.log(doc.id, '=>', doc.data())
                memberData = doc.data()
                //console.log(memberData)
                //console.log(memberData["imgUrl"])
                missingPersonsNum++;
                var div_  = document.createElement("div")
                div_.innerHTML = missingInfo.innerHTML
                div_.className = "missingPersonDiv"
                div_.id = "missingPerson" + missingPersonsNum
                div_.style.display = "none"
                //div_.querySelector('#imgReported').src = doc.data().imgUrl
                div_.querySelector('#nameReported').value = doc.data().name
                div_.querySelector('#ageReported').value = doc.data().age
                div_.querySelector('#phoneNoReported').value = doc.data().phoneNo
                div_.querySelector('#addressReported').value = doc.data().address
                div_.querySelector('#lastSeenReported').value = doc.data().lastSeen
                div_.querySelector('#lastDateReported').value = doc.data().lastDate
                div_.querySelector('#lastOutfitReported').value = doc.data().lastOutfit
                div_.style.marginBottom = "10px"
                modalBody.appendChild(div_)
                missingPersonsArray.push(div_.id)
                var divImg = document.createElement("div")
                divImg.innerHTML =  img_container.innerHTML
                divImg.className = div_.className
                divImg.id = "missingPersonImg" + missingPersonsNum
                divImg.querySelector('#imgReported').src = doc.data().imgUrl
                box_inside.appendChild(divImg)    
                missingPersonsImg.push(divImg.id)
            })
        }

        setTimeout(mem, 1500)
        function mem(){
            //console.log(missingPersonsImg)
            //console.log(missingPersonsArray)
            missingPersonsImg.forEach(item=>{
                const imgReported = document.getElementById(item).querySelector('#imgReported')
                imgReported.addEventListener('click', ()=>{
                    //console.log("CLICK " + item)
                    const missingPersonImgSelected = item.substring(16)
                    //console.log("IMG", missingPersonImgSelected)
                    
                    
                    for(let i=0;i<missingPersonsArray.length;i++){
                        const missingPersonSelected = missingPersonsArray[i].substring(13)
                        //console.log("PERSON", missingPersonSelected)
                        if(missingPersonSelected==missingPersonImgSelected){
                            document.getElementById(missingPersonsArray[i]).style.display = "block"
                            document.getElementById(missingPersonsArray[i]).querySelector('.infoHidden').style.display = "block"
                            //console.log("MATHCED",missingPersonsArray[i])
                        }
                    }

                    modalShow.click()
                    $('#exampleModalCenter').on('hidden.bs.modal', function (e) { 
                        missingPersonsArray.forEach(item1=>{
                            document.getElementById(item1).style.display = "none"
                            document.getElementById(item1).querySelector('.infoHidden').style.display = "none"
                        })
                        seenSubmit.style.display = "none"
                        seenButton.innerHTML="HAVE YOU SEEN ME?"
                        formHidden.style.display = "none"
                    })
                })
            })
            seenButton.addEventListener('click', ()=>{
                if(seenButton.innerHTML=="CANCEL"){
                    seenSubmit.style.display = "none"
                    seenButton.innerHTML="HAVE YOU SEEN ME?"
                    formHidden.style.display = "none"
                    //submitFind.click()
                }else{
                    formHidden.style.display = "block"
                    seenButton.innerHTML="CANCEL"
                    seenSubmit.style.display = "block"
                }        
            })
            seenSubmit.addEventListener('click', ()=>{
                submitFind.click()
            })
            seenForm.addEventListener('submit', (e)=>{
                e.preventDefault()
                console.log('hehe')
                
                console.log(nameSeener.value)
                console.log(contactNoSeener.value)
                console.log(lastSeenSeener.value)
                console.log(lastDateSeener.value)
                console.log(addInfoSeener.value)
                seenForm.reset()
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