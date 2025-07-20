<template>
  <footer class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-2 border-orange-500 mt-16">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 로고 및 설명 -->
        <div class="text-center md:text-left">
          <h3 class="font-title text-2xl font-bold text-orange-400 mb-4">
            🍜 라멘 맛집 가이드
          </h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            진정한 라멘 고수들이 엄선한 서울의 숨겨진 맛집들을 소개합니다. 
            각 가게의 특색과 매력을 AI와 함께 탐험해보세요.
          </p>
        </div>
        
        <!-- 주요 기능 -->
        <div class="text-center">
          <h4 class="text-lg font-semibold text-white mb-4">주요 기능</h4>
          <ul class="text-gray-400 text-sm space-y-2">
            <li>🔍 맛집 검색 및 필터링</li>
            <li>⭐ 평점 및 리뷰 시스템</li>
            <li>🤖 AI 리뷰 요약</li>
            <li>🍽️ AI 메뉴 추천</li>
            <li>📍 위치 기반 추천</li>
          </ul>
        </div>
        
        <!-- 연락처 및 정보 -->
        <div class="text-center md:text-right">
          <h4 class="text-lg font-semibold text-white mb-4">문의하기</h4>
          <div class="text-gray-400 text-sm space-y-2">
            <p>📧 ramen@example.com</p>
            <p>📞 02-1234-5678</p>
            <p>🏢 서울시 강남구 라멘동 123</p>
            <div class="flex justify-center md:justify-end space-x-4 mt-4">
              <span class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition">
                📱
              </span>
              <span class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition">
                💬
              </span>
              <span class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition">
                📸
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 하단 저작권 -->
      <div class="border-t border-gray-700 mt-8 pt-6 text-center">
        <p class="text-gray-500 text-sm">
          © 2025 라멘 맛집 가이드. All rights reserved. 
          <span class="text-orange-400">🍜</span> Made with love for ramen lovers
        </p>
        <p class="text-gray-600 text-xs mt-2">
          이 웹사이트는 라멘 애호가들을 위한 정보 제공 목적으로 제작되었습니다.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer 컴포넌트는 별도의 로직이 필요하지 않으므로 빈 script 블록
</script>

<style scoped>
.font-title {
  font-family: 'Do Hyeon', sans-serif;
}
</style>
