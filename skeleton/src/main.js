// import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(VCalendar, {});
app.use(pinia);
app.use(router);

app.mount('#app');
