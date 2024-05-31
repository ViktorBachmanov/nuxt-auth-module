<script setup>
import { ref } from 'vue'

const checked = ref(false)

const loading = defineModel()

const emit = defineEmits(['goToRegister'])

function handleRegister() {
  emit('goToRegister')
}
</script>


<template>
  <div>
    <h2>Login Dialog</h2>

    <div style="border: 1px solid magenta">
      <label>
        <VBCheckbox v-model="checked" />
        Test checkbox
      </label>
    </div>

    <div
      @click="handleRegister"
      class="cursor-pointer"
    >
      Нет аккаунта?
    </div>
  </div>
</template>