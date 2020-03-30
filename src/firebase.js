import firebase from 'firebase';

const firebaseConfig = {
    //Key in your database details
    apiKey: "AIzaSyCS2qf9sM8RJNj3pRKpdPEck1-QgLqZWKE",
    authDomain: "fir-tutorial-69e2c.firebaseapp.com",
    databaseURL: "https://fir-tutorial-69e2c.firebaseio.com",
    projectId: "fir-tutorial-69e2c",
  };
  
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;