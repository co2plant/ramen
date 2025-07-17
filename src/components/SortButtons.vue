<template>
  <div class="flex justify-end gap-2 mb-4">
    <button :class="['sort-btn', 'bg-gray-700/80', 'shadow-md', 'hover:bg-gray-600', 'text-gray-200', 'font-semibold', 'py-2', 'px-4', 'border', 'border-gray-600', 'rounded-lg', 'transition', { active: sortBy === 'rating' } ]" @click="$emit('sort-change', 'rating')">⭐ 별점순</button>
    <button :class="['sort-btn', 'bg-gray-700/80', 'shadow-md', 'hover:bg-gray-600', 'text-gray-200', 'font-semibold', 'py-2', 'px-4', 'border', 'border-gray-600', 'rounded-lg', 'transition', { active: sortBy === 'distance' } ]" @click="$emit('sort-change', 'distance')">🚗 거리순</button>
  </div>
</template>

<script setup>
const props = defineProps({ sortBy: String });
</script>

<style scoped>
.sort-btn.active { background-color: #EA580C; color: white; border-color: #EA580C; }
</style> 