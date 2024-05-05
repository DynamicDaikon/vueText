<script setup lang="ts">
  import OneSections from './components/OneSections.vue';
</script>

<template>
  <h1>コンポーネント基礎</h1>
  <section>
    <h2>コンポーネント1個</h2>
    <OneSections/>
  </section>
  <section>
    <h2>コンポーネントが複数</h2>
    <OneSections/>
    <OneSections/>
    <OneSections/>
  </section>
</template>

<style scoped>
section {
  border: blue 1px solid;
  margin: 10px;
}
</style>
