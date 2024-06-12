import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import DetailTab from '@/pages/DetailTab.vue';
import MonthSummary from '@/pages/MonthSummary.vue';
import Profile from '@/pages/Profile.vue';
// import quick_btn from '@/pages/quick_btn.vue';
// quick_btn은 마지막에 구현
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'home', component: Home },
    { path: '/tab', name: 'dTab', component: DetailTab },
    { path: '/monSum', name: 'monSum', component: MonthSummary },
    { path: '/profile', name: 'profile', component: Profile },
    // { path: '/Home/QBtn', name: 'home/q_btn', component: quick_btn },
  ],
});

export default router;
