import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

//src="https://www.gstatic.com/firebasejs/6.0.3/firebase-app.js"

var firebaseConfig = {
    apiKey: "AIzaSyAifkcLWNWHk81t8ZddkfCmevkCZN9NppE",
    authDomain: "create-react-app-79547.firebaseapp.com",
    databaseURL: "https://create-react-app-79547.firebaseio.com",
    projectId: "create-react-app-79547",
    storageBucket: "create-react-app-79547.appspot.com",
    messagingSenderId: "969062752817",
    appId: "1:969062752817:web:78dc005cdd902c6d"
};
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <RoomList firebase={firebase} />
  );
}

export default App;
