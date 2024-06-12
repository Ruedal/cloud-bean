// addContent 자료 모아두는 공간
<template>
  <!-- <span>
    {{ content.date }}
  </span> -->
  <tr>
    <td class="text-center">{{ content.date }}</td>
    <td class="text-center">{{ content.type }}</td>
    <td class="text-end">{{ content.category }}</td>
    <td class="text-end">{{ content.amount }}</td>
    <td class="text-center">{{ content.memo }}</td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAddContentStore } from '@/stores/cloudBean.js';

defineProps({
  content: { Type: Object, required: true },
});

const router = useRouter();
const AddContentStore = useAddContentStore();
</script>
