<script setup>
import { ref, computed } from 'vue';
import { ramenShops, raotaUsers } from './data';
import ShopList from './components/ShopList.vue';
import ShopDetailModal from './components/ShopDetailModal.vue';
import LoginModal from './components/LoginModal.vue';
import FilterSidebar from './components/FilterSidebar.vue';
import SortButtons from './components/SortButtons.vue';

const shops = ref(ramenShops);
const loggedInUser = ref(null);
const selectedShop = ref(null);
const showLogin = ref(false);

const aiSummary = ref('');
const aiPairing = ref('');
const aiLoading = ref(false);

const categories = ['all', ...new Set(shops.value.map(s => s.category))];
const filters = ref({ category: 'all', maxPrice: 20000, maxDistance: 20 });
const sortBy = ref('rating');

function resetFilters() {
  filters.value = { category: 'all', maxPrice: 20000, maxDistance: 20 };
  sortBy.value = 'rating';
}
function setSort(type) {
  sortBy.value = type;
}

const filteredShops = computed(() => {
  let result = shops.value.filter(shop => {
    const priceMatch = shop.menu.some(m => m.price <= filters.value.maxPrice);
    const categoryMatch = filters.value.category === 'all' || shop.category === filters.value.category;
    // 거리 필터는 실제 위치 기능 구현 시 추가
    return priceMatch && categoryMatch;
  });
  if (sortBy.value === 'rating') {
    result = result.slice().sort((a, b) => b.avg_rating - a.avg_rating);
  }
  // 거리순 정렬은 실제 위치 기능 구현 시 추가
  return result;
});

function openModal(shop) {
  selectedShop.value = shop;
  aiSummary.value = '';
  aiPairing.value = '';
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

// Gemini API 호출 함수 (index.html 참고, 실제 API 키 필요)
async function callGemini(prompt) {
  const apiKey = ""; // 실제 사용 시 본인 API 키 입력
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
  const payload = { contents: chatHistory };
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`API 호출 실패: ${response.status}`);
    const result = await response.json();
    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      return result.candidates[0].content.parts[0].text;
    } else {
      return "AI가 응답을 생성하지 못했습니다. 다시 시도해주세요.";
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 기능 사용 중 오류가 발생했습니다.";
  }
}

async function handleAISummary() {
  if (!selectedShop.value) return;
  aiLoading.value = true;
  aiSummary.value = 'AI가 리뷰를 분석하고 있습니다...';
  const allReviewsText = selectedShop.value.reviews.map(r => `- ${r.comment}`).join('\n');
  const prompt = `다음은 '${selectedShop.value.name}' 라멘 가게에 대한 전문가들의 리뷰입니다. 이 리뷰들을 한두 문장의 핵심 내용으로 요약해주세요:\n\n${allReviewsText}`;
  aiSummary.value = await callGemini(prompt);
  aiLoading.value = false;
}
async function handleAIPairing() {
  if (!selectedShop.value) return;
  aiLoading.value = true;
  aiPairing.value = 'AI가 어울리는 조합을 찾고 있습니다...';
  const prompt = `'${selectedShop.value.name}'의 대표 메뉴인 ${selectedShop.value.category} 라멘과 가장 잘 어울리는 사이드 메뉴나 음료를 추천해주고, 그 이유를 간단히 설명해주세요.`;
  aiPairing.value = await callGemini(prompt);
  aiLoading.value = false;
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
      <div class="flex flex-col lg:flex-row gap-8">
        <FilterSidebar
          :categories="categories"
          :selectedCategory="filters.category"
          :maxPrice="filters.maxPrice"
          :maxDistance="filters.maxDistance"
          @update:category="v => filters.category = v"
          @update:maxPrice="v => filters.maxPrice = Number(v)"
          @update:maxDistance="v => filters.maxDistance = Number(v)"
          @reset="resetFilters"
        />
        <div class="w-full lg:w-3/4 xl:w-4/5">
          <SortButtons :sortBy="sortBy" @sort-change="setSort" />
          <ShopList :shops="filteredShops" @select-shop="openModal" />
        </div>
      </div>
      <ShopDetailModal
        v-if="selectedShop"
        :shop="selectedShop"
        :user="loggedInUser?.name"
        :aiSummary="aiSummary"
        :aiPairing="aiPairing"
        @close="selectedShop = null"
        @ai-summary="handleAISummary"
        @ai-pairing="handleAIPairing"
      />
      <LoginModal v-if="showLogin" @login="handleLogin" @close="showLogin = false" />
    </main>
  </div>
</template>

<style>
.font-title {
  font-family: 'Do Hyeon', sans-serif;
}
</style>
