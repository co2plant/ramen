<template>
  <ul class="space-y-4">
    <li v-for="(review, idx) in reviews" :key="idx" class="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
      <div class="flex justify-between items-center mb-1">
        <p class="font-semibold text-orange-400">{{ review.user }}</p>
        <div class="text-amber-400 text-xs">{{ '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating) }}</div>
      </div>
      <p class="text-gray-400 text-sm font-semibold mb-2">{{ review.menu }}</p>
      <p class="text-gray-300 text-sm">"{{ review.comment }}"</p>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({ reviews: Array });
</script> 