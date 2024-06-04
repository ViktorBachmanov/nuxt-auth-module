<script setup>
import { ref } from 'vue'
// import { useAuthStore } from '#imports'
import { useAuthDialog } from '#imports'
import { IconX } from '@vbachm/vue-icons-plasm'


// import 
// import { useNuxtApp } from '#app'

// const { $setAuthDialog, $getAuthDialog } = useNuxtApp()

// const authDialog = $getAuthDialog()
// const authDialog = useAuthStore()
const authDialog = useAuthDialog()

const loading = ref(false)
   
const dialogs = {
  loginDialog: {
    comp: resolveComponent('LoginDialog'),
    title: 'Авторизация',
  },
  registerDialog: {
    comp: resolveComponent('RegisterDialog'),
    title: 'Регистрация',
  },
  // emailVerificationDialog: {
  //   comp: resolveComponent('AuthEmailVerificationDialog'),
  //   title: 'Подтвердите Ваш Email',
  // },
  forgetEmailDialog: {
    comp: resolveComponent('ForgetEmailDialog'),
    title: 'Сброс пароля',
  },
  resetPasswordDialog: {
    comp: resolveComponent('ResetPasswordDialog'),
    title: 'Новый пароль',
  },
}

function handleRegister() {
  authDialog.value = 'registerDialog'
}

function handleGetForgetEmail() {
  authDialog.value = 'forgetEmailDialog'
}

function handleLogin() {
  authDialog.value = 'loginDialog'
}

function handleClose() {
  // removeEventListener('keyup', escape)
  // backing.value.style.opacity = 0
  // setTimeout(() => {
    authDialog.value = ''
  // }, 500)
}

// function escape(e) {
//   if (e.key === 'Escape') {
//     close()
//   }
// }

</script>


<template>
  <Transition>
    <div 
      v-if="authDialog"
      class="fixed inset-0 bg-gray-500/50 flex items-center justify-center"
      style="z-index: 51"
    >

      <div 
        class="relative bg-white dark:bg-slate-800 rounded-[1.5em] px-4 py-9 sm:px-[100px] w-[580px] max-w-[100vw] max-h-[100vh]" 
      >
        <header class="font-semibold text-2xl">
          {{ dialogs[authDialog].title }}
        </header>

        <button 
          class="absolute top-0 right-0 w-[3em] h-[3em] flex items-center justify-center rounded-full"
          @click="handleClose"
        >
          <IconX class="text-[#D0D3D5] w-6 h-6" />
        </button>

        <Transition mode="out-in">
          <component 
            :is="dialogs[authDialog].comp" 
            @close="handleClose"
            @go-to-forget-email="handleGetForgetEmail"
            @go-to-register="handleRegister"
            @go-to-login="handleLogin"
            v-model="loading"
          /> 
        </Transition>  

        <Transition>
          <div 
            v-if="loading"
            class="fixed inset-0 bg-gray-500/50 flex items-center justify-center"
          >
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </Transition>
      </div>

    </div>
  </Transition>
</template>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  /* transform: translateY(-50px) */
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
