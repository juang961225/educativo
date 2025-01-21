<template>
  <div class="mt-5">
    <h1>Home Page</h1>

    <UButton
    icon="i-heroicons-pencil-square"
    size="sm"
    color="primary"
    variant="link"
    label="Form"
    :trailing="false"
    class="mt-3"
    @click="redirectTo"
  />

    <UButton
    icon="material-symbols:list-alt-rounded"
    size="sm"
    color="primary"
    variant="link"
    label="List"
    :trailing="false"
    class="mt-3"
    href="/"
  />
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

const redirectTo = () => {
  router.push('/formEducativo');
};

</script>

<style lang="scss" scoped>

</style>