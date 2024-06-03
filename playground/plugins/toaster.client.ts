import { defineNuxtPlugin } from "#app";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default defineNuxtPlugin((_nuxtApp) => {
  console.log("Toaster plugin injected!");

  const toast = useToast();
  return {
    provide: {
      toast,
    },
  };
});
