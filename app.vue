<template>
  <div>
    <div v-if="loading" class="splash-screen">
      <img src="/logo-animation-transparent.gif" />
    </div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref(true);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  setTimeout(() => {
    loading.value = false;
  }, 1000)
});
</script>

<style>
.splash-screen {
  background: rgb(var(--v-theme-on-surface-variant));
  color-scheme: dark;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 9999;
}
</style>
