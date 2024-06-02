<script setup>
import { ref } from 'vue'
import '@vbachm/vue-lib/style.css'

const checked = ref(false)

const loading = defineModel()

const emit = defineEmits(['goToRegister'])

function handleRegister() {
  emit('goToRegister')
}

const email = ref('')
</script>


<template>
  <div>
    <h2>Login Dialog</h2>

    <InputVB 
      type="email"
      placeholder="Email"
      v-model="email"
    />

    <div style="border: 1px solid magenta">
        <CheckboxVB 
          v-model="checked" 
          postfixLabel="Test checkbox"
          id="rememberCheckbox"
        />
    </div>

    <div
      @click="handleRegister"
      class="cursor-pointer"
    >
      Нет аккаунта?
    </div>
  </div>
</template>