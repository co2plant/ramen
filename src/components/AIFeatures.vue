<template>
  <div class="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
    <h3 class="font-title text-xl font-semibold mb-4 text-orange-400">✨ AI 기능</h3>
    <div class="space-y-4">
      <div>
        <button :disabled="loading" @click="$emit('ai-summary')" class="w-full flex items-center justify-center gap-2 bg-orange-600/80 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition">
          {{ loading ? '요약 생성 중...' : 'AI 리뷰 요약' }}
        </button>
        <div v-if="summary" class="mt-3 p-3 bg-gray-700/50 rounded-md text-sm text-gray-300">{{ summary }}</div>
      </div>
      <div>
        <button :disabled="loading" @click="$emit('ai-pairing')" class="w-full flex items-center justify-center gap-2 bg-sky-600/80 hover:bg-sky-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition">
          {{ loading ? '추천 생성 중...' : 'AI 페어링 추천' }}
        </button>
        <div v-if="pairing" class="mt-3 p-3 bg-gray-700/50 rounded-md text-sm text-gray-300">{{ pairing }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ shop: Object, summary: String, pairing: String, loading: Boolean });
</script> 