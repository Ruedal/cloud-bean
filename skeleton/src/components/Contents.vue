<!-- addContent 자료 모아두는 공간 -->
<!-- 클릭 이벤트로 addContent에 해당 내용 불러오게 -->
<template>
  <tr class="table-thead-tr">
    <td class="text-center">{{ contents.date.substr(0, 10) }}</td>
    <td class="text-center">{{ contents.category }}</td>
    <td class="text-end" v-if="contents.type === '입금'">
      {{ contents.amount }}
    </td>
    <td class="text-end">{{ '' }}</td>
    <td class="text-end" v-if="contents.type === '출금'">
      {{ contents.amount }}
    </td>
    <td class="text-center">{{ contents.memo }}</td>
  </tr>
</template>

<script setup>
defineProps({
  contents: { Type: Object, required: true },
});
</script>
<style>
/* .table-thead-tr {
  display: table;
  width: 100%;
} */
</style>
