import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjGXiF5vLuaEmN4RC7xRr_htz2jbO56qA",
    authDomain: "plate-e7db4.firebaseapp.com",
    projectId: "plate-e7db4",
    storageBucket: "plate-e7db4.appspot.com",
    messagingSenderId: "824528395743",
    appId: "1:824528395743:web:f3ef6ef6c1ee8e1583386a",
    measurementId: "G-8RBXRMPDLB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const app = createApp(App)

app.use(router)

app.mount('#app')
