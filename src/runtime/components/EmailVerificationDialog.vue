<script setup>
import { backendFetch, backendFetchXSRF } from '#imports'

const { $toast } = useNuxtApp();

const loading = defineModel()

const emit = defineEmits(['close'])

async function handleSubmit() {
  loading.value = true

  // await new Promise((r) => setTimeout(r, 3000))
  // loading.value = false
  // $toast.info('Заглушка работает')
  // return

  await backendFetch('/sanctum/csrf-cookie')

  try {
    const response = await backendFetchXSRF('/api/email/verification-notification', {
      method: 'POST',
    })
    $toast.info('Вам на почту оправлена ссылка для подтверждения Email', {
      duration: 0,
      dismissible: true,
    })
    emit('close')
  } catch (error) {
    // console.log('[error data]', error.data)
    // console.log('[error status]', error.status)
    $toast.error(`Ошибка ${error.data?.message}`)
  }
  loading.value = false
}
</script>


<template>
  <div>
    <button 
      type="button"
      @click="handleSubmit"
      class="mt-5 flex items-center rounded-[20px] w-full justify-center border-none p-5 bg-black dark:bg-zinc-800 shadow-none font-bold max-w-full text-lg text-white"
    >
      Отправить на почту ссылку для подтверждения Email
    </button>
  </div>
</template>

