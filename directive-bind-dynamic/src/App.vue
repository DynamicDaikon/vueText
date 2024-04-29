<script setup lang="ts">
import { ref } from 'vue'

const widthOrHeight = ref('height')
const widthOrHeightValue = ref(100)
</script>

<template>
  <p><img src="./assets/logo.svg" alt="VueLogo" v-bind:[widthOrHeight]="widthOrHeightValue" /></p>
</template>

<style scoped></style>
