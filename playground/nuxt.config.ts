export default defineNuxtConfig({
  modules: ["../src/module", "@pinia/nuxt"],
  myModule: {},
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  // alias: {
  //   pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  // },
});
