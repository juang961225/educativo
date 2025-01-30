import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";

export const useFirebaseAuth = () => {

  const { $auth } = useNuxtApp();
  const currentUser = ref<FirebaseUser | null>(null);

  // Solo usar localStorage si estamos en el cliente
  if (process.client) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      currentUser.value = JSON.parse(savedUser);
    }
  }

  // Observador de estado de autenticación configurado inmediatamente
  if ($auth) {
    onAuthStateChanged($auth, (user: FirebaseUser | null) => {
      currentUser.value = user;
      if (user && process.client) {
        localStorage.setItem('user', JSON.stringify(user)); // Guardamos el usuario en localStorage
      } else if (process.client) {
        localStorage.removeItem('user'); // Eliminamos el usuario de localStorage
      }
    });
  }

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $auth,
        email,
        password)

      const user = userCredential.user
      console.log(user);

    } catch (error) {
      console.log(error);

    }
  };

  const login = async (email: string, password: string) => {

    try {
      const userCredential = await signInWithEmailAndPassword(
        $auth,
        email,
        password);
      const user = userCredential.user;
      console.log(user);

    } catch (error) {
      console.log(error);

    }

  }

  const logout = async () => {
    await signOut($auth);
    await navigateTo('/login');
  }

  return {
    register,
    login,
    logout,
    currentUser
  }

}