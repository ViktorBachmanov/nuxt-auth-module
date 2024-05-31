import { defineNuxtPlugin } from "#app";
import { useAuthDialog } from "./composables/useAuthDialog";

export default defineNuxtPlugin((_nuxtApp) => {
  console.log("Plugin injected by my-module!");

  const authDialog = useAuthDialog();

  return {
    provide: {
      setAuthDialog: (dialogName: string) => {
        authDialog.value = dialogName;
      },
    },
  };
});
