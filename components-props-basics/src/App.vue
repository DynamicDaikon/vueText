<script setup lang="ts">
import OneInfo from './components/OneInfo.vue';
</script>

<template>
  <section>
    <h1>Propsの基礎</h1>
    <OneInfo
    title="Propsの利用"
    content="子コンポーネントにデータを渡すにはPropsを利用する。"/>
  </section>
</template>

<style scoped>
section {
  border:blue 1px solid;
  margin:10px;
}
</style>
