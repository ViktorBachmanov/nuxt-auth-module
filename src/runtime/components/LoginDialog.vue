<script setup>
import { ref, watch } from 'vue'
import { useRuntimeConfig, useRoute, clearError } from '#app'
import { useUser, backendFetch, backendFetchXSRF } from '#imports'

const { $toast } = useNuxtApp();

import { InputVB, CheckboxVB } from '@vbachm/vue-lib'
import '@vbachm/vue-lib/style.css'
import { IconTelegram, IconUser, IconUnlock, IconEyeSlash } from '@vbachm/vue-icons-plasm'


const config = useRuntimeConfig()

const loading = defineModel()

const emit = defineEmits(['close', 'goToRegister', 'goToForgetEmail'])

function handleRegister() {
  emit('goToRegister')
}

const email = ref('')

const credentialsError = ref('')
const anotherError = ref('')

const password = ref('')

const remember = ref(false)

const user = useUser()

const route = useRoute()

watch(password, () => {
  credentialsError.value = ''
})

async function handleLogin() {
  loading.value = true

  // await new Promise((r) => setTimeout(r, 3000))
  // loading.value = false
  // $toast.success('Успешный тест')
  // emit('close')
  // return

  await backendFetch('/sanctum/csrf-cookie')

  try {
    const response = await backendFetchXSRF('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        remember_me: remember.value,
      },
    })
    $toast.success('Вы вошли')
    // console.log('response: ', response)
    user.value = response
    clearError()
    if (route.path.includes('email/verify')) {
      window.location.reload()
    }
    emit('close')
  } catch (error) {
    // console.log('[error data]', error.data)
    // console.log('[error status]', error.status)
    $toast.error('Ошибка')

    switch (error.status) {
      case 401:
      case 422:
        credentialsError.value = (error.data.email || error.data.errors?.email[0] || error.data.errors?.password[0])
        break;
      default:
        anotherError.value = error.data.message
        break;
    }
  }
  loading.value = false
}

const passwordInputType = ref('password')

function togglePasswordInputType() {
  passwordInputType.value = passwordInputType.value == 'password'
    ? 'text'
    : 'password'
}


</script>


<template>
  <div>
    <div class="text-sm text-[#707070] mt-3">
      Быстрая регистрация через нашего бота!
    </div>

    <NuxtLink 
      class="disabled:opacity-75 w-full mt-5 mb-6 flex items-center justify-center gap-x-4 p-4 font-bold text-lg rounded-[20px] bg-black text-white dark:bg-zinc-800"
      :to="`https://t.me/${config.public.cutsystemsBot}`"
      target="_blank"
    >
      <IconTelegram />
      Телеграмм бот
    </NuxtLink>

    <div class="border-t border-[#EAEAEA] py-4 text-sm text-[#707070] indent-1">
      Введите данные для авторизации
    </div>

    <InputVB 
      type="email"
      placeholder="Ваш e-mail"
      v-model:value="email"
      class="!w-full"
      wrapperClass="!border-[#D9D9D9] dark:!border-gray-400"
      colorLight="#6F46C4"
      bgColorDark="#1e293b"
      v-model:error="credentialsError"
    >
      <template #prefixIcon>
        <IconUser class="w-[20px]"/>
      </template>
    </InputVB>

    <InputVB 
      :type="passwordInputType"
      placeholder="Пароль"
      v-model:value="password"
      class="!w-full"
      wrapperClass="!border-[#D9D9D9] dark:!border-gray-400"
      colorLight="#6F46C4"
      bgColorDark="#1e293b"
      :errorSpace="false"
    >
      <template #prefixIcon>
        <IconUnlock class="w-[20px]" />
      </template>

      <template #postfixIcon>
        <IconEyeSlash class="w-[20px] cursor-pointer" @click="togglePasswordInputType" />
      </template>
    </InputVB>

    <div 
        class="text-sm text-[#707070] cursor-pointer text-right mt-1 mr-2"
        @click="emit('goToForgetEmail')"
      >
      Забыли пароль?
    </div>

    <CheckboxVB 
      v-model="remember" 
      postfixLabel="Оставаться авторизованным после входа"
      id="rememberCheckbox"
      labelClass="text-sm font-normal"
      class="mt-3 ml-3"
      borderClass="dark:text-gray-500"
    />

    <div
      v-if="anotherError"
      class="text-red-500 mt-4"
    >
      {{ anotherError }}
    </div>

    <button 
      type="button"
      @click="handleLogin"
      class="mt-7 flex items-center rounded-[20px] w-full justify-center border-none p-5 bg-black dark:bg-zinc-800 shadow-none font-bold max-w-full text-lg text-white"
    >
        Продолжить
    </button>

    <div
      @click="handleRegister"
      class="text-center text-sm font-semibold cursor-pointer mt-6"
    >
      Нет аккаунта?
    </div>
  </div>
</template>