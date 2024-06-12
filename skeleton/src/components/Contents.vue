// addContent 자료 모아두는 공간
<template>
  <li>
    <span>
      {{ addContent.memo }}
    </span>
    <span class="float-end badge bg-secondary pointer m-1">편집</span>
    <span class="float-end badge bg-secondary pointer m-1">삭제</span>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAddContentStore } from '@/stores/cloudBean.js';

defineProps({
  addContent: { Type: Object, required: true },
});

const router = useRouter();
const AddContentStore = useAddContentStore();
const { fetchAddContents } = AddContentStore;
</script>
