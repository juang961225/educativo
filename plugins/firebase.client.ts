import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log("CLIENTE CLIENTE CLIENTE");

  const firebaseConfig = {
    apiKey: "AIzaSyCJWWpVB1h_AiHH3bDeI2cWnOB11S39N8g",
    authDomain: "educativo-b97b8.firebaseapp.com",
    projectId: "educativo-b97b8",
    storageBucket: "educativo-b97b8.firebasestorage.app",
    messagingSenderId: "555139080236",
    appId: "1:555139080236:web:32244336caac9be25d7189"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);  // Inicializa Firestore

  try {
    await setPersistence(auth, browserLocalPersistence);  // Configura persistencia local
  } catch (error) {
    console.error("Error al establecer la persistencia:", error);
  }

  return {
    provide: {
      auth,
      db  // Proporciona Firestore a toda tu app
    }
  }
});
