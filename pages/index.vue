<script setup>
import { useRouter } from 'vue-router';

const { logout } = useFirebaseAuth();
const router = useRouter();

definePageMeta({
  middleware: 'auth' // Redirige a usuarios autenticados fuera de esta página
});

const redirectToForm = () => {
  router.push('/formEducativo');
};

const redirectToList = () => {
  router.push('/list');
};


</script>

<template>
  <div class="mt-5">
    <div class=" flex justify-between">
      <h1>Home Page</h1>
      <UButton class="" @click="logout">
        Logout
      </UButton>
    </div>

    <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="link" label="Form" :trailing="false"
      class="mt-3" @click="redirectToForm" />

    <UButton icon="material-symbols:list-alt-rounded" size="sm" color="primary" variant="link" label="List"
      :trailing="false" class="mt-3" @click="redirectToList" />
  </div>
</template>

<style lang="scss" scoped></style>