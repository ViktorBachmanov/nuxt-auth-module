<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

import { InputVB, CheckboxVB } from '@vbachm/vue-lib'
import '@vbachm/vue-lib/style.css'
import { IconTelegram, IconUser } from '@vbachm/vue-icons-plasm'


const config = useRuntimeConfig()

const checked = ref(false)

const loading = defineModel()

const emit = defineEmits(['goToRegister'])

function handleRegister() {
  emit('goToRegister')
}

const email = ref('')

const error = ref('some error')

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
      placeholder="Ваш e-mail"
      v-model="email"
      class="!w-full"
      wrapperClass="!border-[#D9D9D9] dark:!border-gray-400"
      colorLight="#6F46C4"
      :error="error"
    >
      <template #prefixIcon>
        <IconUser class="w-[20px]"/>
      </template>
    </InputVB>

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