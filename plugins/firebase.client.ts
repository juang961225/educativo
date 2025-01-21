// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export default defineNuxtPlugin(nuxtApp => {
  console.log("CLIENTE CLIENTE CLIENTE");

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCJWWpVB1h_AiHH3bDeI2cWnOB11S39N8g",
    authDomain: "educativo-b97b8.firebaseapp.com",
    projectId: "educativo-b97b8",
    storageBucket: "educativo-b97b8.firebasestorage.app",
    messagingSenderId: "555139080236",
    appId: "1:555139080236:web:32244336caac9be25d7189"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  return {
    provide: {
      auth
    }
  }
})