<template>
  <div class="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 flex flex-col">
    <Header
      :loggedInUser="loggedInUser"
      @login="showLogin = true"
      @logout="handleLogout"
    />

    <main class="flex-1 container mx-auto max-w-7xl p-4 mt-8">
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
        @review-add="handleReviewAdd"
      />
      <LoginModal v-if="showLogin" @login="handleLogin" @close="showLogin = false" />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ramenShops, raotaUsers } from './data';
import { calculateDistance } from './utils/distance';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ShopList from './components/ShopList.vue';
import ShopDetailModal from './components/ShopDetailModal.vue';
import LoginModal from './components/LoginModal.vue';
import FilterSidebar from './components/FilterSidebar.vue';
import SortButtons from './components/SortButtons.vue';

const STORAGE_KEY = 'ramen-reviews-v1';
const baseGeo = { lat: 37.4979, lng: 127.0276 };

const persistedReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
const initialShops = ramenShops.map((shop) => ({
  ...shop,
  reviews: persistedReviews[String(shop.id)] ?? shop.reviews,
}));

const shops = ref(initialShops);
const loggedInUser = ref(null);
const selectedShop = ref(null);
const showLogin = ref(false);

const aiSummary = ref('');
const aiPairing = ref('');

const categories = ['all', ...new Set(shops.value.map(s => s.category))];
const filters = ref({ category: 'all', maxPrice: 20000, maxDistance: 20 });
const sortBy = ref('rating');

watch(
  shops,
  (next) => {
    const reviewMap = Object.fromEntries(next.map((shop) => [String(shop.id), shop.reviews]));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewMap));
  },
  { deep: true }
);

function resetFilters() {
  filters.value = { category: 'all', maxPrice: 20000, maxDistance: 20 };
  sortBy.value = 'rating';
}
function setSort(type) {
  sortBy.value = type;
}

const filteredShops = computed(() => {
  let result = shops.value
    .map((shop) => ({ ...shop, distance: calculateDistance(baseGeo.lat, baseGeo.lng, shop.geo.lat, shop.geo.lng) }))
    .filter(shop => {
      const priceMatch = shop.menu.some(m => m.price <= filters.value.maxPrice);
      const categoryMatch = filters.value.category === 'all' || shop.category === filters.value.category;
      const distanceMatch = shop.distance <= filters.value.maxDistance;
      return priceMatch && categoryMatch && distanceMatch;
    });

  if (sortBy.value === 'rating') {
    result = result.slice().sort((a, b) => b.avg_rating - a.avg_rating);
  }
  if (sortBy.value === 'distance') {
    result = result.slice().sort((a, b) => a.distance - b.distance);
  }

  return result;
});

function openModal(shop) {
  selectedShop.value = shop;
  aiSummary.value = '';
  aiPairing.value = '';
}
function handleLogin(userId) {
  const normalizedId = userId.trim().toLowerCase();
  const user = raotaUsers.find(u => u.id === normalizedId);
  if (!user) {
    alert('존재하지 않는 데모 계정입니다. raota 또는 expert를 입력해주세요.');
    return;
  }

  loggedInUser.value = user;
  showLogin.value = false;
}
function handleLogout() {
  loggedInUser.value = null;
}


function handleReviewAdd(review) {
  if (!selectedShop.value) return;

  const targetId = selectedShop.value.id;
  shops.value = shops.value.map((shop) =>
    shop.id === targetId ? { ...shop, reviews: [...shop.reviews, review] } : shop
  );

  const updated = shops.value.find((shop) => shop.id === targetId);
  if (updated) {
    selectedShop.value = {
      ...updated,
      distance: calculateDistance(baseGeo.lat, baseGeo.lng, updated.geo.lat, updated.geo.lng),
    };
  }
}

async function callGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return 'VITE_GEMINI_API_KEY가 설정되지 않아 AI 기능을 사용할 수 없습니다.';

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const payload = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`API 호출 실패: ${response.status}`);
    const result = await response.json();
    return result?.candidates?.[0]?.content?.parts?.[0]?.text || 'AI가 응답을 생성하지 못했습니다. 다시 시도해주세요.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'AI 기능 사용 중 오류가 발생했습니다.';
  }
}

async function handleAISummary() {
  if (!selectedShop.value) return;
  aiSummary.value = 'AI가 리뷰를 분석하고 있습니다...';
  const allReviewsText = selectedShop.value.reviews.map(r => `- ${r.comment}`).join('\n');
  const prompt = `다음은 '${selectedShop.value.name}' 라멘 가게에 대한 전문가들의 리뷰입니다. 이 리뷰들을 한두 문장의 핵심 내용으로 요약해주세요:\n\n${allReviewsText}`;
  aiSummary.value = await callGemini(prompt);
}

async function handleAIPairing() {
  if (!selectedShop.value) return;
  aiPairing.value = 'AI가 어울리는 조합을 찾고 있습니다...';
  const prompt = `'${selectedShop.value.name}'의 대표 메뉴인 ${selectedShop.value.category} 라멘과 가장 잘 어울리는 사이드 메뉴나 음료를 추천해주고, 그 이유를 간단히 설명해주세요.`;
  aiPairing.value = await callGemini(prompt);
}
</script>
