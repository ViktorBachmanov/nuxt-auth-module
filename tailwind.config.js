/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/runtime/components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./playground/app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
