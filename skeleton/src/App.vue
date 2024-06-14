<template>
<<<<<<< HEAD
  <div class="container">
    <div id="top">
      <Head />
    </div>
    <div class="container-fluid">
      <div class="row">
        <div id="left" class="mt-2 col-md-2">
          <Side />
        </div>
        <div id="right" class="col-md-10">
          <router-view></router-view>
=======
    <div class="container">
        <div id="top">
            <Head />
        </div>
        <div class="container-fluid">
            <div class="row">
                <div id="left" class="mt-2 col-md-2">
                    <Side />
                </div>
                <div id="right" class="col-md-10">
                    <router-view></router-view>
                </div>
            </div>
>>>>>>> 479aa454ea9abfd60fd97c52801878d49eb901a0
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Head from '@/components/Head.vue';
import Side from '@/components/Side.vue';
// import History from '@/components/History.vue';
// import Calendar from '@/components/Calendar.vue';
import { useAddContentStore } from '@/stores/cloudBean.js';

const AddContentStore = useAddContentStore();
const fetchAddContent = AddContentStore.fetchAddContents;
const fetchIncomeCategory = AddContentStore.fetchIncomeCategory;
const fetchExpenseCategory = AddContentStore.fetchExpenseCategory;

onMounted(() => {
    fetchAddContent();
    fetchIncomeCategory();
    fetchExpenseCategory();
});
console.log(fetchIncomeCategory);
</script>

<style>
#top {
<<<<<<< HEAD
  margin-top: 10px;
=======
    margin-top: 10px;
>>>>>>> 479aa454ea9abfd60fd97c52801878d49eb901a0
}
#left {
    margin-left: -10px;
}
#right {
<<<<<<< HEAD
  width: 85%;
  margin-left: -15px;
  margin-top: -11px;
  margin-bottom: -10px;
}
#top {
  margin-right: 30px;
=======
    width: 85%;
    margin-left: -15px;
    margin-top: -11px;
    margin-bottom: -10px;
}
#top {
    margin-right: 30px;
>>>>>>> 479aa454ea9abfd60fd97c52801878d49eb901a0
}
</style>
