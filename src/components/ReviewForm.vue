<template>
  <form @submit.prevent="submitReview" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-300 mb-1">메뉴 선택</label>
      <select v-model="selectedMenu" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
        <option v-for="m in menu" :key="m.name" :value="m.name">{{ m.name }}</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-300 mb-1">별점</label>
      <div class="flex text-2xl">
        <span v-for="n in 5" :key="n" class="star cursor-pointer" :class="{ 'text-amber-400': n <= rating, 'text-gray-500': n > rating }" @click="rating = n">★</span>
      </div>
    </div>
    <textarea v-model="comment" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500" rows="3" placeholder="리뷰를 남겨주세요..." required></textarea>
    <button type="submit" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition">작성 완료</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({ menu: Array, user: String });
const emit = defineEmits(['review-add']);
const selectedMenu = ref(props.menu[0]?.name || '');
const rating = ref(0);
const comment = ref('');
function submitReview() {
  if (!selectedMenu.value || rating.value === 0 || !comment.value.trim()) return;
  emit('review-add', {
    user: props.user,
    menu: selectedMenu.value,
    rating: rating.value,
    comment: comment.value.trim(),
  });
  // 초기화
  selectedMenu.value = props.menu[0]?.name || '';
  rating.value = 0;
  comment.value = '';
}
</script>

<style scoped>
.star { transition: color 0.2s; }
</style> 