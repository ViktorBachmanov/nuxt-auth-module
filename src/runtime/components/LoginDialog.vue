<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import '@vbachm/vue-lib/style.css'
import { IconTelegram } from '@vbachm/vue-icons-plasm'

const checked = ref(false)

const loading = defineModel()

const emit = defineEmits(['goToRegister'])

function handleRegister() {
  emit('goToRegister')
}

const email = ref('')

const config = useRuntimeConfig()
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

    <div class="border-t border-[#EAEAEA] py-4 text-sm text-[#707070]">
      Введите данные для авторизации
    </div>

    <InputVB 
      type="email"
      placeholder="Email"
      v-model="email"
      class="!w-full"
    />

    <CheckboxVB 
      v-model="checked" 
      postfixLabel="Test checkbox"
      id="rememberCheckbox"
    />

    <div
      @click="handleRegister"
      class="cursor-pointer"
    >
      Нет аккаунта?
    </div>
  </div>
</template>