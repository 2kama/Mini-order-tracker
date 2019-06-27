import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'


// Initalize and export Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyB9QgRa5Ttk_ngYjUscIh3JFOfYmFY4T94",
    authDomain: "order-tracker-57fac.firebaseapp.com",
    databaseURL: "https://order-tracker-57fac.firebaseio.com",
    projectId: "order-tracker-57fac",
    storageBucket: "",
    messagingSenderId: "337480707659",
    appId: "1:337480707659:web:c9805dfea89bffa5"
  };

firebase.initializeApp(firebaseConfig)

// const settings = {timestampsInSnapshots: true};

// firebase.firestore().settings(settings)

export default firebase