<template>
  <div class="container">
    <!-- <Header /> -->
    <!-- <History /> -->
    <DetailTab />
    <!-- <QBtn></QBtn> -->
    <router-view />
  </div>
</template>

<script setup>
// import Header from '@/components/Header.vue';
// import History from '@/components/History.vue';
import DetailTab from '@/pages/DetailTab.vue';
// import QBtn from '@/components/QBtn.vue';
import { onMounted } from 'vue';
import { useAddContentStore } from '@/stores/cloudBean.js';

const AddContentStore = useAddContentStore();
const fetchAddContent = AddContentStore.fetchAddContents;
onMounted(() => {
  fetchAddContent();
});
</script>
