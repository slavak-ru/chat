'use strict';
import css from './style.css';
import App from './components/app/app';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCW0TqK1Bsd6A7r7e3kYN6isiJ20tcChCM',
  authDomain: 'chat-2b2e7.firebaseapp.com',
  databaseURL: 'https://chat-2b2e7.firebaseio.com',
  projectId: 'chat-2b2e7',
  storageBucket: 'chat-2b2e7.appspot.com',
  messagingSenderId: '242297640263',
};
firebase.initializeApp(config);

// Initialize FB SDK
window.fbAsyncInit = function() {
  FB.init({
    appId            : '2115973775398203',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.1'
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src =
    'https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v3.1&appId=2115973775398203';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

let app = new App({ element: document.getElementById('app') });
