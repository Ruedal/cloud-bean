// addContent 자료 모아두는 공간
<template>
    <tr class="table-thead-tr">
        <td class="text-center">{{ contents.date.substr(0, 10) }}</td>
        <td class="text-center">{{ contents.category }}</td>
        <td class="text-end">{{ contents.amount }}</td>
        <td class="text-end">{{ contents.amount }}</td>
        <td class="text-center">{{ contents.memo }}</td>
    </tr>
    <!-- <span v-if="contents.type === '입금'{
    <td class="text-end">{{ "contents.amount" }}</td>
    <td class="text-end">{{  "" }}</td>
}"></span> -->
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
