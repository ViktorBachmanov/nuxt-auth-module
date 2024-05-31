import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // const user = ref(null)

  const authDialog = ref("");

  return { authDialog };
});
