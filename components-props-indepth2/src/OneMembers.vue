<template>
  <section class="box">
    <h4>{{ name }}さんの情報</h4>
    <dl>
      <dt>ID</dt>
      <dd>{{ id }}</dd>
      <dt>メールアドレス</dt>
      <dd>{{ email }}</dd>

      <dt>保有ポイント</dt>
      <dd>{{ localPoints }}</dd>

      <dt>備考</dt>
      <dd>{{ note }}</dd>
    </dl>
    <button @click="pointUp">ポイント加算</button>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  id: number
  name: string
  email: string
  points: number
  note?: string
}

// const props = defineProps<Props>()
const props = withDefaults(defineProps<Props>(), { note: '---' })

const localPoints = ref(props.points)
// const localNote = computed((): string => {
//   let localNote = props.note
//   if (localNote == undefined) {
//     localNote = '---'
//   }
//   return localNote
// })

const pointUp = (): void => {
  localPoints.value++
}
</script>

<style scoped>
.box {
  border: green 1px solid;
  margin: 10px;
}
</style>
