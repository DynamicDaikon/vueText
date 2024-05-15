<template>
  <h1>会員管理</h1>
  <nav id="breadcrumbs">
    <ul>
      <li>
        <RouterLink v-bind:to="{ name: 'AppTop' }"> TOP </RouterLink>
      </li>
      <li>
        <RouterLink v-bind:to="{ name: 'MemberList' }">会員リスト</RouterLink>
      </li>
      <li>会員詳細情報</li>
    </ul>
  </nav>
  <section>
    <h2>会員詳細情報</h2>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
