// addContent 자료 모아두는 공간
<template>
  <tr>
    <td class="text-center">{{ addContent.date }}</td>
    <td class="text-center">{{ addContent.type }}</td>
    <td class="text-end">{{ addContent.category }}</td>
    <td class="text-end">{{ addContent.amount }}</td>
    <td class="text-center">{{ addContent.memo }}</td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAddContentStore } from '@/stores/cloudBean.js';

defineProps({
  addContent: { Type: Object, required: true },
});

const router = useRouter();
const AddContentStore = useAddContentStore();
</script>
