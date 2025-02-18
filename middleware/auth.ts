import { getAuth, onAuthStateChanged } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) { // Solo ejecuta esto en el cliente
    const auth = getAuth();
    
    const checkAuth = new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });

    const user = await checkAuth;

    if (!user) {
      return navigateTo('/login');
    }
  }
});
