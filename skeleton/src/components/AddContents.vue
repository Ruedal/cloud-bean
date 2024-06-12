<!-- detail_tab 1번 컴포넌트 -->

<template>
  <div>
    <div class="row">
      <!-- 날짜  -->
      <div id="cal">
        <span class="font-semibold">날짜 선택</span>
        <VDatePicker v-model="contents.date">
          <template #default="{ togglePopover }">
            <button
              class="px-3 py-2 bg-primary text-white font-semibold rounded-4"
              @click="togglePopover"
            >
              Select date
            </button>
          </template>
        </VDatePicker>
      </div>
    </div>
    <!-- 입출금, 카테고리, 메모, 버튼 -->
    <div class="form-row d-flex">
      <!-- 입출금, 카테고리, 메모 -->
      <div class="d-flex">
        <div class="row">
          <div class="form-row d-flex">
            <div class="p-1 form-group col-md-4">
              <label for="">입금/출금</label>
              <select class="form-control" v-model="contents.type">
                <option selected>입금</option>
                <option>출금</option>
              </select>
            </div>
            <div class="p-1 form-group col-md-4">
              <label for="inputState">카테고리</label>
              <select
                id="inputState"
                class="form-control"
                v-model="contents.category"
              >
                <option selected>Choose...</option>
                <option>...</option>
                <option>...</option>
                <option>...</option>
                <option>...</option>
                <option>...</option>
              </select>
            </div>
            <div class="p-1 form-group col-md-4">
              <label for="inputZip">금액</label>
              <input
                type="text"
                class="form-control"
                id="inputZip"
                v-model="contents.amount"
              />
            </div>
          </div>

          <div class="">
            <div class="p-1 form-group col-md-12">
              <label>메모</label><br />
              <textarea
                row="3"
                class="form-control"
                placeholder="메모를 입력하세요"
                v-model="contents.memo"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- 버튼 그룹 -->
        <div class="mt-4 form-group">
          <div class=""></div>
          <div>
            <button type="button" class="btn btn-outline-primary m-1">
              리 셋</button
            ><br />
            <button type="button" class="btn btn-outline-primary m-1">
              삭 제</button
            ><br />
            <button
              type="button"
              class="btn btn-primary m-1"
              @click="addContentsHandler"
            >
              등 록
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const attributes = ref([
  {
    highlight: true,
    dates: {
      start: new Date(2022, 10, 7),
      repeat: {
        every: [2, 'weeks'],
        weekdays: 2,
      },
    },
  },
]);

const router = useRouter();
// const { addTodo } = inject('actions');
// const todoItem = reactive({ todo: '', desc: '' });
// const addTodoHandler = () => {
// let { todo } = todoItem;
// if (!todo || todo.trim() === '') {
//     alert('할일은 반드시 입력해야 합니다');
//     return;
// }
// addTodo({ ...todoItem });
// router.push('/todos');
const date = function () {
  new Date.getDate();
};
import { useAddContentStore } from '@/stores/cloudBean.js';

defineProps({
  addContent: { Type: Object, required: true },
});
// , fetchAddContents
const { addAC } = useAddContentStore();
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
  // fetchAddContents();
};
</script>
