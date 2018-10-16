'use strict';
import css from'./style.css';
import App from'./components/app/app';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCW0TqK1Bsd6A7r7e3kYN6isiJ20tcChCM",
  authDomain: "chat-2b2e7.firebaseapp.com",
  databaseURL: "https://chat-2b2e7.firebaseio.com",
  projectId: "chat-2b2e7",
  storageBucket: "chat-2b2e7.appspot.com",
  messagingSenderId: "242297640263"
};
firebase.initializeApp(config);


let app = new App({element: document.getElementById('app')});
