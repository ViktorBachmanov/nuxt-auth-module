<script setup>
const checked = ref(false)
</script>


<template>
  <div style="border: 1px solid magenta">
    <label>
      <VBCheckbox v-model="checked" />
      Test checkbox
    </label>
  </div>
</template>