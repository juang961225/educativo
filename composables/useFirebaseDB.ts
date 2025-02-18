import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNuxtApp } from '#app';

export const useFirebaseDB = () => {
  const { $db } = useNuxtApp();

  // Método para agregar un formulario
  const addFormData = async (formData: any) => {
    try {
      const docRef = await addDoc(collection($db, "formSubmissions"), formData);
      console.log("Documento creado con ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error al agregar documento:", error);
      throw error;
    }
  };

  // Método para obtener todos los formularios
  const getFormSubmissions = async () => {
    try {
      const querySnapshot = await getDocs(collection($db, "formSubmissions"));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error al obtener documentos:", error);
      throw error;
    }
  };

  return {
    addFormData,
    getFormSubmissions,
  };
};
