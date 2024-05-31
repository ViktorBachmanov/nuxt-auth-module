<script setup>
import { useAuthStore } from '#imports'

const authDialog = useAuthStore()


function openAuthDialog() {
  authDialog.value = 'loginDialog'
}

function handleToggleTheme() {
  // const documentEl = document?.documentElement.classList.add(ThemeVal.Dark)
  document?.documentElement.classList.toggle('dark')
}
</script>


<template>
  <div>
    Nuxt module playground!
  </div>

  <AuthDialog />

  <button
    @click="openAuthDialog"
  >
    Open auth dialog
  </button>

  <br>

  <button
    @click="handleToggleTheme"
  >
    Toggle theme
  </button>
</template>


