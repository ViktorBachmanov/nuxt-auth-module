<script setup>


onMounted(() => {
  useAuthDialog().value = 'resetPasswordDialog'
})

// let response = ref('')
// onMounted(async () => {
//   response.value = await backendFetchXSRF(`/api${route.fullPath}`)
// })

// console.log('data: ', data.value)

</script>


<template>
  <div class="min-h-[60vh]">
    <!-- <div class="mt-20 text-xl font-medium text-center">{{ response }}</div> -->
  </div>
</template>