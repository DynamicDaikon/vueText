<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore } from './stores/counter'

const counterStore = useCounterStore()
const count = computed((): number => {
  return counterStore.counter
})

const doubleCount = computed((): number => {
  return counterStore.doubleCount
})

const onIncrementClick = () => {
  counterStore.increment()
}
</script>

<template>
  <p>現在のポイント：{{ count }}</p>
  <p>現在のポイントをさらに倍：{{ doubleCount }}</p>
  <button v-on:click="onIncrementClick">加算</button>
</template>

<style scoped></style>
