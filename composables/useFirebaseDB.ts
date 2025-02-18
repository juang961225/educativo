import { collection, addDoc } from "firebase/firestore";
import { useNuxtApp } from '#app';

export const useFirebaseDB = () => {
  const { $db } = useNuxtApp(); // Cambiado de $firebaseApp a $db

  const addFormData = async (formData: any) => {
    try {
      const docRef = await addDoc(collection($db, "formSubmissions"), formData);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  return {
    addFormData,
  };
};
