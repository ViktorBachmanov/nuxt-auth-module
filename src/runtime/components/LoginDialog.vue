<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

import { InputVB, CheckboxVB } from '@vbachm/vue-lib'
import '@vbachm/vue-lib/style.css'
import { IconTelegram, IconUser, IconUnlock, IconEyeSlash } from '@vbachm/vue-icons-plasm'


const config = useRuntimeConfig()

const checked = ref(false)

const loading = defineModel()

const emit = defineEmits(['close', 'goToRegister', 'goToForgetEmail'])

function handleRegister() {
  emit('goToRegister')
}

const email = ref('')

const error = ref('')

const password = ref('')

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
      v-model="email"
      class="!w-full"
      wrapperClass="!border-[#D9D9D9] dark:!border-gray-400"
      colorLight="#6F46C4"
      bgColorDark="#1e293b"
      :error="error"
    >
      <template #prefixIcon>
        <IconUser class="w-[20px]"/>
      </template>
    </InputVB>

    <InputVB 
      :type="passwordInputType"
      placeholder="Пароль"
      v-model="password"
      class="!w-full"
      wrapperClass="!border-[#D9D9D9] dark:!border-gray-400"
      colorLight="#6F46C4"
      bgColorDark="#1e293b"
      :error="error"
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
      v-model="checked" 
      postfixLabel="Оставаться авторизованным после входа"
      id="rememberCheckbox"
      labelClass="text-sm font-normal"
      class="mt-3 ml-3"
      borderClass="dark:text-gray-500"
    />

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