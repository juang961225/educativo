import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";

export const useFirebaseAuth = () => {
  const { $auth } = useNuxtApp();
  const currentUser = ref<FirebaseUser | null>(null);

  if ($auth) {
    onAuthStateChanged($auth, (user: FirebaseUser | null) => {
      currentUser.value = user;
    });
  }

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword($auth, email, password);
      console.log(userCredential.user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword($auth, email, password);
      console.log(userCredential.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut($auth);
    await navigateTo('/login');
  };

  return {
    register,
    login,
    logout,
    currentUser
  };
};
