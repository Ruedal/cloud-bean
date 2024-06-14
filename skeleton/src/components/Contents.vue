<!-- addContent 자료 모아두는 공간 -->
<!-- 클릭 이벤트로 addContent에 해당 내용 불러오게 -->
<template>
  <tr class="">
    <td class="" @click="router.push(`/tab/edit/${contents.id}`)">
      {{ contents.date.substr(0, 10) }}
    </td>
    <td class="text-center" @click="router.push(`/tab/edit/${contents.id}`)">
      {{ contents.category }}
    </td>
    <td
      class="text-end"
      @click="router.push(`/tab/edit/${contents.id}`)"
      v-if="contents.type === '입금'"
    >
      {{ contents.amount }}
    </td>
    <td class="text-end" @click="router.push(`/tab/edit/${contents.id}`)">
      {{ '' }}
    </td>
    <td
      class="text-end"
      @click="router.push(`/tab/edit/${contents.id}`)"
      v-if="contents.type === '출금'"
    >
      {{ contents.amount }}
    </td>
    <td class="text-center" @click="router.push(`/tab/edit/${contents.id}`)">
      {{ contents.memo }}
    </td>
    <td
      class="badge bg-dark text-light pointer m-1"
      @click="deleteAC(contents.id)"
    >
      삭제
    </td>
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
const { deleteAC } = AddContentStore;
</script>
<style>
/* .table-thead-tr {
display: table;
width: 100%;
} */
</style>
