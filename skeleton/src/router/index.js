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
        { path: '/Home', name: 'Home', component: Home },
        { path: '/Tab', name: 'DTab', component: DetailTab },
        { path: '/MonSum', name: 'MonSum', component: MonthSummary },
        { path: '/Profile', name: 'Profile', component: Profile },
        // { path: '/Home/QBtn', name: 'home/q_btn', component: quick_btn },
    ],
});

export default router;
