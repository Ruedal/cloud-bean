// addContent 자료 모아두는 공간
<template>
  <!-- <span>
    {{ content.date }}
  </span> -->
  <tr>
    <td class="text-center">{{ contents.date }}</td>
    <td class="text-center">{{ contents.type }}</td>
    <td class="text-end">{{ contents.category }}</td>
    <td class="text-end">{{ contents.amount }}</td>
    <td class="text-center">{{ contents.memo }}</td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAddContentStore } from '@/stores/cloudBean.js';

defineProps({
  contents: { Type: Object, required: true },
});

const router = useRouter();
const AddContentStore = useAddContentStore();
</script>
