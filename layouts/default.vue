<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between items-center">
          <UIcon name="mdi:cast-education" class="w-14 h-14" />
          <h1 class="font-bold text-2xl">Education List</h1>
          <!-- Botón de toggle para cambiar el tema -->
          <client-only>
            <button
              @click="toggleTheme"
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none"
            >
              <span class="flex justify-center items-center" v-if="colorMode.value === 'dark'">
                <UIcon name="mdi:white-balance-sunny" class="w-7 h-7" />
              </span>
              <span class="flex justify-center items-center" v-else>
                <UIcon name="mdi:moon-waning-crescent" class="w-7 h-7" />
              </span>
            </button>
          </client-only>
        </div>
      </template>
      <slot />
    </UCard>
  </UContainer>
</template>

<script setup>
// Usamos el sistema de colorMode de Nuxt
import { useColorMode } from '#imports';

const colorMode = useColorMode();

// Función para alternar entre los temas
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

<style>
/* Estilos opcionales para animar el cambio de tema */
html {
  transition: background-color 0.3s, color 0.3s;
}
</style>
