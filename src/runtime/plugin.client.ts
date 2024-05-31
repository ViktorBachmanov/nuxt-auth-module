import { defineNuxtPlugin, useState } from "#app";

export default defineNuxtPlugin((_nuxtApp) => {
  console.log("Plugin injected by my-module!");

  const authDialog = useState("authDialog", () => "");

  return {
    provide: {
      setAuthDialog: (dialogName: string) => {
        authDialog.value = dialogName;
      },
    },
  };
});
