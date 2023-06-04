// eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
// eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyA7BpJRXkSbWe7eiuoCfu7CJ-YjqP-xEos",
    authDomain: "umbrella-forecast.firebaseapp.com",
    projectId: "umbrella-forecast",
    storageBucket: "umbrella-forecast.appspot.com",
    messagingSenderId: "811300570217",
    appId: "1:811300570217:web:ace91fe742b93c5a9f0ef8",
    measurementId: "G-BZ7PPMWX1F"
  };
  
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
};

self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    if (event.action) {
      clients.openWindow(event.action)
    }
    event.notification.close()
  })