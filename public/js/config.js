// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA8CWMQ1mO_-8MIUNQBB50CAsO-RhEfonw",
    authDomain: "missing-4c433.firebaseapp.com",
    projectId: "missing-4c433",
    storageBucket: "missing-4c433.appspot.com",
    messagingSenderId: "495207773493",
    appId: "1:495207773493:web:1a7bfdb3c839e78198c87c"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // make auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();
  const store = firebase.storage();
  //update firestore settings
  db.settings({ timestampsInSnapshots: true});
  
  
  