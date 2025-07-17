<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black bg-opacity-70" @click="$emit('close')"></div>
    <div class="bg-gray-800 border border-gray-700 w-11/12 max-w-2xl mx-auto rounded-2xl shadow-2xl relative p-8 z-10">
      <button class="absolute top-4 right-5 text-gray-400 hover:text-white text-3xl" @click="$emit('close')">&times;</button>
      <img :src="shop.image" :alt="shop.name" class="w-full h-64 object-cover rounded-t-2xl mb-6" />
      <h2 class="font-title text-4xl font-bold text-orange-400 mb-2">{{ shop.name }}</h2>
      <p class="text-gray-400 text-md mb-4">{{ shop.category }} 라멘 전문점</p>
      <p class="text-gray-300 text-sm mb-8 flex items-center"><span class="mr-2 text-lg">📍</span>{{ shop.address }}</p>
      <div class="mb-8">
        <h3 class="font-title text-2xl font-semibold mb-4 border-b-2 border-gray-700 pb-2 text-gray-200">📋 대표 메뉴</h3>
        <ul class="space-y-3 text-gray-300">
          <li v-for="item in shop.menu" :key="item.name" class="flex justify-between items-center">
            <span>{{ item.name }}</span>
            <span class="font-semibold text-gray-100">⭐ {{ item.rating.toFixed(1) }}</span>
          </li>
        </ul>
      </div>
      <!-- 리뷰, AI, 리뷰작성 등은 추후 추가 -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ shop: Object });
</script> 