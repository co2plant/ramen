<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    <ShopCard v-for="shop in shops" :key="shop.id" :shop="shop" @click="() => $emit('select-shop', shop)" />
  </div>
</template>

<script setup>
import ShopCard from './ShopCard.vue';
const props = defineProps({ shops: Array });
</script> 