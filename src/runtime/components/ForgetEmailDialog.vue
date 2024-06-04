<script setup>
import { ref } from 'vue'
import { backendFetch, backendFetchXSRF } from '#imports'

import { InputVB } from '@vbachm/vue-lib'
import '@vbachm/vue-lib/style.css'
import { IconUser } from '@vbachm/vue-icons-plasm'


const { $toast } = useNuxtApp();

const email = ref('')

const emailError = ref('')
const anotherError = ref('')

function resetErrors() {
  emailError.value = ''
  anotherError.value = ''
}

const loading = defineModel()

const emit = defineEmits(['close'])

async function handleSubmit() {
  resetErrors()

  loading.value = true

  // await new Promise((r) => setTimeout(r, 3000))
  // loading.value = false
  // return

  await backendFetch('/sanctum/csrf-cookie')

  try {
    const response = await backendFetchXSRF('/api/forgot-password', {
      method: 'POST',
      body: {
        email: email.value,
      },
    })
    $toast.success('Вам на почту отправлена ссылка на сброс пароля')
    // console.log('response: ', response)
    emit('close')
  } catch (error) {
    // console.log('[error data]', error.data)
    // console.log('[error status]', error.status)
    switch (error.status) {
      case 422:
        emailError.value = error.data?.email || error.data.errors?.email?.[0]
        break;
      default:
        anotherError.value = error.data?.message
        break;
    }
  }
  loading.value = false

}
</script>



<template>  
  <div>
    <div class="border-t border-[#EAEAEA] py-4 text-sm text-[#707070]">
      Введите email для получения ссылки на сброс пароля
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

      <div
        v-if="anotherError"
        class="text-red-500"
      >
        {{ anotherError }}
      </div>

      <button 
        type="button"
        @click="handleSubmit"
        class="mt-5 flex items-center rounded-[20px] w-full justify-center border-none p-5 bg-black dark:bg-zinc-800 shadow-none font-bold max-w-full text-lg text-white"
      >
        Получить ссылку на сброс пароля
      </button>

    </div>
  </div>
</template>

