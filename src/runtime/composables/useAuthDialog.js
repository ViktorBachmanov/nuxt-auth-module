import { useState } from "#imports";

export const useAuthDialog = (dialogName = "") => {
  return useState("authDialog", () => dialogName);
};
