import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDtoh2OhG1vSeeO4Jt2kXIsA3A1Drzy5Oc",
  authDomain: "contacts-web-app-6bff4.firebaseapp.com",
  databaseURL: "https://contacts-web-app-6bff4.firebaseio.com",
  projectId: "contacts-web-app-6bff4",
  storageBucket: "contacts-web-app-6bff4.appspot.com",
  messagingSenderId: "410627071390",
  appId: "1:410627071390:web:765b25b6ad1091f791ca8f",
  measurementId: "G-J4ZFPXECZ6"
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
