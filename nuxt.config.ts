// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from './package.json';
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  // devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public : {
      clientVersion: pkg.version,
    }
  }
})
