<template>
    <div class="container">
        <Header />
        <History />
        <router-view />
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import History from '@/components/History.vue';
// import { useAddContentStore } from '@/stores/cloudBean.js';

// const AddContentStore = useAddContentStore();
// const fetchTodoList = todoListStore.fetchTodoList;
// fetchTodoList();
</script>
