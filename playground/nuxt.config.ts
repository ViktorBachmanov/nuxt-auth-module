export default defineNuxtConfig({
  modules: ["../src/module"],
  myModule: {},
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
});
