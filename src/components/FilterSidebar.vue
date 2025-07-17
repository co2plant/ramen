<template>
  <aside class="w-full lg:w-1/4 xl:w-1/5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg h-fit mb-8 lg:mb-0">
    <h2 class="font-title text-2xl font-bold mb-6 border-b border-gray-600 pb-3 text-orange-400">상세 검색 🏮</h2>
    <div class="mb-6">
      <h3 class="font-semibold mb-3 text-gray-300">라멘 종류</h3>
      <div class="flex flex-wrap gap-2">
        <button v-for="cat in categories" :key="cat" :class="['tag category-tag px-3 py-1 border rounded-full text-sm', { 'active': cat === selectedCategory }]" @click="$emit('update:category', cat)">
          {{ cat === 'all' ? '전체' : cat }}
        </button>
      </div>
    </div>
    <div class="mb-6">
      <h3 class="font-semibold mb-2 text-gray-300">최대 가격</h3>
      <input type="range" :min="8000" :max="20000" step="1000" :value="maxPrice" @input="$emit('update:maxPrice', $event.target.value)" class="w-full cursor-pointer">
      <div class="text-right mt-2 text-sm font-medium text-orange-400">₩{{ Number(maxPrice).toLocaleString() }}</div>
    </div>
    <div class="mb-6">
      <h3 class="font-semibold mb-2 text-gray-300">최대 거리</h3>
      <input type="range" :min="1" :max="20" step="1" :value="maxDistance" @input="$emit('update:maxDistance', $event.target.value)" class="w-full cursor-pointer">
      <div class="text-right mt-2 text-sm font-medium text-orange-400">{{ maxDistance }} km 이내</div>
    </div>
    <button @click="$emit('reset')" class="w-full bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded-lg transition duration-200">🔄 초기화</button>
  </aside>
</template>

<script setup>
const props = defineProps({
  categories: Array,
  selectedCategory: String,
  maxPrice: [String, Number],
  maxDistance: [String, Number],
});
</script>

<style scoped>
.tag { transition: all 0.2s; border-color: #4B5563; }
.tag:hover { background-color: #4B5563; }
.tag.active { background-color: #F97316; color: white; font-weight: 700; border-color: #F97316; }
</style> 