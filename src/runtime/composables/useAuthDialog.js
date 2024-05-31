export const useAuthDialog = (dialogName = "") => {
  return useState("authDialog", () => dialogName);
};
