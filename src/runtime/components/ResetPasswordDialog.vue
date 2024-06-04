<script setup>
import { ref } from 'vue'
import { useRoute } from '#app'
import { backendFetch, backendFetchXSRF } from '#imports'

import { InputVB } from '@vbachm/vue-lib'
import '@vbachm/vue-lib/style.css'
import { IconUser, IconUnlock, IconEyeSlash } from '@vbachm/vue-icons-plasm'


const { $toast } = useNuxtApp();

const route = useRoute()

// console.log('fullPath: ', route.fullPath)
// console.log('query ', route.query)

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const emailError = ref('')
const passwordError = ref('')
const passwordConfirmError = ref('')
const anotherError = ref('')

function resetErrors() {
  emailError.value = ''
  passwordError.value = ''
  passwordConfirmError.value = ''
  anotherError.value = ''
}

const loading = defineModel()

const emit = defineEmits(['goToLogin'])

async function handleSubmit() {
  resetErrors()
  
  loading.value = true

  // await new Promise((r) => setTimeout(r, 3000))
  // loading.value = false
  // $toast.success('Тест успешный')
  // return

  await backendFetch('/sanctum/csrf-cookie')

  try {
    const response = await backendFetchXSRF('/api/reset-password', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirm.value,
        token: route.query.token,
      },
    })
    $toast.success('Новый пароль установлен')
    // console.log('response: ', response)
    emit('goToLogin')
  } catch (error) {
    // console.log('[error data]', error.data)
    // console.log('[error status]', error.status)
    switch (error.status) {
      case 422:
        emailError.value = error.data.errors?.email?.[0] || ''
        passwordError.value = error.data.errors?.password?.[0] || ''
        // passwordConfirmError.value = error.data.errors?.password_confirmation[0] || ''
        break;
      default:
        // errors.value.push(error.data.email || error.data.errors?.email[0])
        anotherError.value = error.data?.message
        $toast.error('Ошибка')
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

const passwordConfirmInputType = ref('password')

function togglePasswordConfirmInputType() {
  passwordConfirmInputType.value = passwordConfirmInputType.value == 'password'
    ? 'text'
    : 'password'
}
</script>



<template>  
  <div>
    <div class="border-t border-[#EAEAEA] py-4 text-sm text-[#707070]">
      Введите email и password
    </div>

    <div>
      <InputVB 
        type="email"
        placeholder="Ваш e-mail"
        v-model:value="email"
        class="!w-full"
        wrapperClass="!border-[#D9D9D9] dark:!border-gray-400"
        colorLight="#6F46C4"
        bgColorDark="#1e293b"
        v-model:error="emailError"
      >
        <template #prefixIcon>
          <IconUser class="w-[20px]"/>
        </template>
      </InputVB>

      <InputVB 
        :type="passwordInputType"
        placeholder="Пароль"
        v-model:value="password"
        class="!w-full mt-2"
        wrapperClass="!border-[#D9D9D9] dark:!border-gray-400"
        colorLight="#6F46C4"
        bgColorDark="#1e293b"
        v-model:error="passwordError"
      >
        <template #prefixIcon>
          <IconUnlock class="w-[20px]" />
        </template>

        <template #postfixIcon>
          <IconEyeSlash class="w-[20px] cursor-pointer" @click="togglePasswordInputType" />
        </template>
      </InputVB>

      <InputVB 
        :type="passwordConfirmInputType"
        placeholder="Подтвердите пароль"
        v-model:value="passwordConfirm"
        class="!w-full mt-2"
        wrapperClass="!border-[#D9D9D9] dark:!border-gray-400"
        colorLight="#6F46C4"
        bgColorDark="#1e293b"
        :errorSpace="false"
      >
        <template #prefixIcon>
          <IconUnlock class="w-[20px]" />
        </template>

        <template #postfixIcon>
          <IconEyeSlash class="w-[20px] cursor-pointer" @click="togglePasswordConfirmInputType" />
        </template>
      </InputVB>

      <div
        v-if="anotherError"
        class="text-red-500 mt-8"
      >
        {{ anotherError }}
      </div>

      <button 
        type="button"
        @click="handleSubmit"
        class="mt-10 flex items-center rounded-[20px] w-full justify-center border-none p-5 bg-black dark:bg-zinc-800 shadow-none font-bold max-w-full text-lg text-white"
      >
        Установить пароль
      </button>

    </div>
  </div>
</template>


