<template>
  <header class="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-2xl border-b-2 border-orange-500">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <!-- 로고 및 타이틀 영역 -->
        <div class="text-center lg:text-left mb-4 lg:mb-0">
          <h1 class="font-title text-4xl lg:text-6xl font-bold text-orange-400 drop-shadow-lg tracking-wide">
            🍜 나를 위한 라멘 맛집 찾기
          </h1>
          <p class="text-gray-400 mt-2 text-lg">
            서울의 숨겨진 라멘 고수들의 성지를 찾아보세요!
          </p>
        </div>
        
        <!-- 사용자 정보 및 로그인 영역 -->
        <div class="flex justify-center lg:justify-end">
          <button 
            v-if="!loggedInUser" 
            @click="$emit('login')" 
            class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            🍜 라오타 로그인
          </button>
          <div v-else class="flex items-center gap-4 bg-gray-700/50 rounded-lg p-4 backdrop-blur">
            <span class="text-orange-400 font-semibold text-lg">
              👋 {{ loggedInUser.name }}님 환영합니다!
            </span>
            <button 
              @click="$emit('logout')" 
              class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  loggedInUser: {
    type: Object,
    default: null
  }
});

defineEmits(['login', 'logout']);
</script>

<style scoped>
.font-title {
  font-family: 'Do Hyeon', sans-serif;
}
</style>
