import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import DetailTab from '@/pages/DetailTab.vue';
import MonthSummary from '@/pages/MonthSummary.vue';
import Profile from '@/pages/Profile.vue';
import EditContents from '@/pages/EditContents.vue';
// import quick_btn from '@/pages/quick_btn.vue';
// quick_btn은 마지막에 구현
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/tab', name: 'DTab', component: DetailTab },
    { path: '/monsum', name: 'MonSum', component: MonthSummary },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/tab/edit/:id', name: 'DTab/edit/id', component: EditContents },
    // { path: '/Home/QBtn', name: 'home/q_btn', component: quick_btn },
  ],
});

export default router;
