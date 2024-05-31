import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  // const user = ref(null)

  const authDialog = ref("");

  return { authDialog };
});
