import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyA0hD7F6yMV5431CaoD-urloGlkF0LTB-w',
  authDomain: 'cloud-functions-demo-9a978.firebaseapp.com',
  databaseURL: 'https://cloud-functions-demo-9a978.firebaseio.com',
  projectId: 'cloud-functions-demo-9a978',
  storageBucket: 'cloud-functions-demo-9a978.appspot.com',
  messagingSenderId: '819906533038',
};

firebase.initializeApp(config);

var db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;
