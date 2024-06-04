<script setup>
// import { useAuthStore } from '#imports'
import { useAuthDialog } from '#imports'
import { backendFetch, backendFetchXSRF } from '#imports'

// const authDialog = useAuthStore()
const authDialog = useAuthDialog()


function openAuthDialog() {
  authDialog.value = 'loginDialog'
}

function openEmailVerificationDialog() {
  authDialog.value = 'emailVerificationDialog'
}

function handleToggleTheme() {
  // const documentEl = document?.documentElement.classList.add(ThemeVal.Dark)
  document?.documentElement.classList.toggle('dark')
}

async function handleTestRequest() {
  await backendFetch('/api/reset-password-preview')
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
    @click="openEmailVerificationDialog"
  >
    Open email verification dialog
  </button>

  <br>

  <button
    @click="handleToggleTheme"
  >
    Toggle theme
  </button>

  <br>

  <button
    @click="handleTestRequest"
    class="m-10"
  >
    Test request
  </button>
</template>


