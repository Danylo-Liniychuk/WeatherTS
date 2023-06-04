import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';


const firebaseConfig = {
    apiKey: "AIzaSyA7BpJRXkSbWe7eiuoCfu7CJ-YjqP-xEos",
    authDomain: "umbrella-forecast.firebaseapp.com",
    projectId: "umbrella-forecast",
    storageBucket: "umbrella-forecast.appspot.com",
    messagingSenderId: "811300570217",
    appId: "1:811300570217:web:ace91fe742b93c5a9f0ef8",
    measurementId: "G-BZ7PPMWX1F"
}

initializeApp(firebaseConfig)
const messaging = getMessaging();
onMessage(messaging, function (payload) {
  try {  //try???
    console.log('Message received. ', payload);

    const noteTitle = (payload.notification) ? payload.notification.title : '';
    const noteOptions = {
      body: (payload.notification) ? payload.notification.body : '',
      icon: "logo.jpg", 
    };

    console.log("title ", noteTitle, " ",(payload.notification) ? payload.notification.body : '');
    //var notification = //examples include this, seems not needed

    new Notification((noteTitle) ? noteTitle : '', noteOptions).onclick = function (event) {
      console.log(event);
    };
  }
  catch (err) {
    console.log('Caught error: ', err);
  }
});