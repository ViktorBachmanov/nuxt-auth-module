<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>


<template>
  <h2>Login Dialog</h2>

  <div style="border: 1px solid magenta">
    <label>
      <VBCheckbox v-model="checked" />
      Test checkbox
    </label>
  </div>
</template>