<template>
  <div class="container">
    <div id="top">
      <Head />
    </div>
    <div class="container-fluid border">
      <div class="row">
        <div id="left" class="col-md-2 border">
          <Side />
        </div>
        <div id="right" class="col-md-10 flex-fill">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Head from '@/components/Head.vue';
import Side from '@/components/Side.vue';
// import History from '@/components/History.vue';
// import Calendar from '@/components/Calendar.vue';
// import { useAddContentStore } from '@/stores/cloudBean.js';

const AddContentStore = useAddContentStore();
const fetchAddContent = AddContentStore.fetchAddContents;
onMounted(() => {
  fetchAddContent();
});
</script>
<style>
#top {
  margin-top: 3px;
}
#left {
  margin-left: -10px;
}
#right {
  margin: -10px;
}
#top {
  margin-right: 13px;
}
</style>
