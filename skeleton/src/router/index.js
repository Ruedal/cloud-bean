import { createRouter, createWebHistory } from 'vue-router';

import home from '@/pages/home.vue';
import detail_tab from '@/pages/detail_tab.vue';
import monthSummary from '@/pages/monthSummary.vue';
import profile from '@/pages/profile.vue';
// import quick_btn from '@/pages/quick_btn.vue';
// quick_btn은 마지막에 구현
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'home', component: home },
    { path: '/detail', name: 'detail', component: detail_tab },
    { path: '/monSum', name: 'monSum', component: monthSummary },
    { path: '/profile', name: 'profile', component: profile },
    // { path: '/home/q_btn', name: 'home/q_btn', component: quick_btn },
  ],
});

export default router;
