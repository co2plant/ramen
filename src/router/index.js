import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path : '/', Component: () => import('../views/Home.vue') },
]

const router = createRouter({
    history : createWebHistory(),
    routes,
})

export default router