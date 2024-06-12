<template>
  <div class="row">
    <div class="col">
      <div class="form-group m-1 p-3">
        <label htmlFor="date">날짜 :</label>
        <input
          type="text"
          class="form-control"
          id="date"
          v-model="contents.date"
        />
      </div>
      <div class="form-group m-1 p-3">
        <label htmlFor="type">유형 :</label>
        <input
          type="text"
          class="form-control"
          id="type"
          v-model="contents.type"
        />
      </div>
      <div class="form-group m-1 p-3">
        <label htmlFor="category">카테고리 :</label>
        <input
          type="text"
          class="form-control"
          id="category"
          v-model="contents.category"
        />
      </div>
      <div class="form-group m-1 p-3">
        <label htmlFor="amount">금액 :</label>
        <input
          type="text"
          class="form-control"
          id="amount"
          v-model="contents.amount"
        />
      </div>
      <div class="form-group m-1 p-3">
        <label htmlFor="memo">메모 :</label>
        <textarea
          class="form-control"
          rows="4"
          id="memo"
          v-model="contents.memo"
        ></textarea>
      </div>
      <div class="form-group float-end m-1 p-3">
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="addContentsHandler"
        >
          추 가
        </button>
        &nbsp;
        <button
          type="button"
          class="btn btn-primary m-1"
          @click="deleteAC(addContent.id)"
        >
          삭 제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAddContentStore } from '@/stores/cloudBean.js';

defineProps({
  addContent: { Type: Object, required: true },
});

const { addAC, deleteAC } = useAddContentStore();
const contents = reactive({
  date: '',
  type: '',
  category: '',
  amount: '',
  memo: '',
});

const addContentsHandler = () => {
  // 예외처리 추가하기(빈칸처리)
  addAC({ ...contents }, () => {});
};
</script>
