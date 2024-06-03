import { useState } from "#imports";

export const useUser = () => {
  return useState("user", () => null);
};
