<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black bg-opacity-70" @click="$emit('close')"></div>
    <div class="bg-gray-800 border border-gray-700 w-11/12 max-w-sm mx-auto rounded-2xl shadow-2xl p-8 relative z-10">
      <h2 class="font-title text-3xl text-center text-orange-400 mb-6">라오타 로그인</h2>
      <form @submit.prevent="onLogin">
        <input v-model="username" type="text" placeholder="아이디를 입력하세요 (예: raota)" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 mb-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500">
        <button type="submit" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition">로그인</button>
      </form>
      <button class="absolute top-4 right-5 text-gray-400 hover:text-white text-3xl" @click="$emit('close')">&times;</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const username = ref('');
function onLogin() {
  if (username.value.trim()) {
    // 부모로 아이디 전달
    emit('login', username.value.trim());
  }
}
const emit = defineEmits(['login', 'close']);
</script> 