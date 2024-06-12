<template>
  <div>
    <div class="row">
      <div class="col p-3">
        <router-link class="btn btn-primary" to="/Home"> 홈 이동 </router-link>
        <button class="btn btn-primary ms-1" @click="fetchAddContents">
          새로 고침
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul class="list-group">
          <Contents v-for="i in addContent" :key="i.id" :i="i" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAddContentStore } from '@/stores/cloudBean.js';
import Contents from '@/components/Contents.vue';

const AddContentStore = useAddContentStore();
const { fetchAddContents } = AddContentStore.fetchAddContents;
const addContent = computed(() => AddContentStore.addContent);
</script>
