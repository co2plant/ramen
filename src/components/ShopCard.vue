<template>
  <div class="bg-gray-800/60 border border-gray-700 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group" @click="$emit('click')">
    <div class="overflow-hidden">
      <img :src="shop.image" :alt="shop.name" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div class="p-5 flex flex-col h-full">
      <div class="flex justify-between items-start">
        <h3 class="font-title text-2xl font-bold mb-1 text-gray-100">{{ shop.name }}</h3>
        <span class="text-sm font-bold bg-orange-500/20 text-orange-400 px-2.5 py-1 rounded-full border border-orange-500/30">⭐ {{ shop.avg_rating.toFixed(1) }}</span>
      </div>
      <p class="text-gray-400 text-sm mb-3">{{ shop.category }}</p>
      <div class="flex justify-between items-center text-sm text-gray-300">
        <span>{{ shop.menu[0].name }}</span>
        <span class="font-semibold text-gray-100">₩{{ shop.menu[0].price.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ shop: Object });
</script> 