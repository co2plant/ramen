<script setup>
import { ref } from 'vue';
import { ramenShops, raotaUsers } from './data';
import ShopList from './components/ShopList.vue';
import ShopDetailModal from './components/ShopDetailModal.vue';
import LoginModal from './components/LoginModal.vue';

const shops = ref(ramenShops);
const loggedInUser = ref(null);
const selectedShop = ref(null);
const showLogin = ref(false);

function openModal(shop) {
  selectedShop.value = shop;
}
function handleLogin(userId) {
  const user = raotaUsers.find(u => u.id === userId);
  if (user) {
    loggedInUser.value = user;
    showLogin.value = false;
  }
}
function handleLogout() {
  loggedInUser.value = null;
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100">
    <header class="text-center my-10 relative">
      <div class="absolute top-0 right-0">
        <button v-if="!loggedInUser" @click="showLogin = true" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition">라오타 로그인</button>
        <div v-else class="flex items-center gap-4">
          <span class="text-orange-400 font-semibold">{{ loggedInUser.name }}님 환영합니다!</span>
          <button @click="handleLogout" class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition">로그아웃</button>
        </div>
      </div>
      <h1 class="font-title text-6xl font-bold text-orange-400 drop-shadow-lg" style="letter-spacing: 2px;">🍜 나를 위한 라멘 맛집 찾기</h1>
      <p class="text-gray-400 mt-4 text-lg">서울의 숨겨진 라멘 고수들의 성지를 찾아보세요!</p>
    </header>
    <main class="container mx-auto max-w-7xl p-4">
      <ShopList :shops="shops" @select-shop="openModal" />
      <ShopDetailModal v-if="selectedShop" :shop="selectedShop" @close="selectedShop = null" />
      <LoginModal v-if="showLogin" @login="handleLogin" @close="showLogin = false" />
    </main>
  </div>
</template>

<style>
.font-title {
  font-family: 'Do Hyeon', sans-serif;
}
</style>
