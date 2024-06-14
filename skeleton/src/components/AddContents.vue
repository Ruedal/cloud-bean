<!-- detail_tab 1번 컴포넌트 -->
<template>
  <!-- 1 -->
  <div id="acc" class="bg-light border border-black rounded-3">
    <!-- 2 -->
    <div id="cal" class="d-flex gap-3 align-items-center">
      <span class="font-bold">날짜 선택</span>
      <VDatePicker v-model="contents.date">
        <template #default="{ togglePopover }">
          <button
            class="px-3 py-2 bg-dark text-white font-semibold rounded-4"
            @click="togglePopover"
          >
            Select date
          </button>
        </template>
      </VDatePicker>
    </div>
    <!-- 3 -->
    <div id="d3" class="d-flex flex-row">
      <!-- 4 -->
      <div id="d4" class="col-sm-11 form-row">
        <!-- 5 -->
        <div id="d5" class="flex-fill">
          <div class="form-row d-flex">
            <div class="form-group flex-fill">
              <label for="transactionType">입금/출금</label>
              <select
                v-model="contents.type"
                @change="onTransactionTypeChange"
                class="form-control"
                id="transactionType"
              >
                <option value="입금">입금</option>
                <option value="출금">출금</option>
              </select>
            </div>
            <div class="form-group flex-fill">
              <label for="category">카테고리</label>
              <select
                v-model="contents.category"
                class="form-control"
                id="category"
              >
                <option value="" selected>Choose...</option>
                <option
                  v-for="option in categoryOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
            <div class="form-group flex-fill">
              <label for="amount">금액</label>
              <input
                type="text"
                class="form-control"
                id="amount"
                v-model="contents.amount"
              />
            </div>
          </div>
        </div>
        <!-- 6 -->
        <div id="6" class="form-group col-sm-12">
          <label>메모</label><br />
          <textarea
            row="3"
            class="form-control"
            placeholder="메모를 입력하세요"
            v-model="contents.memo"
          ></textarea>
        </div>
      </div>
      <!-- 7 -->
      <!-- 버튼 그룹 -->
      <div id="d7" class="col-sm-1">
        <button
          type="button"
          class="btn btn-outline-dark m-1"
          @click="resetForm"
        >
          리 셋</button
        ><br />
        <button
          type="button"
          class="btn btn-dark m-1"
          @click="addContentsHandler"
        >
          등 록
        </button>
      </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAddContentStore } from '@/stores/cloudBean.js';
import { format } from 'date-fns';

const router = useRouter();
const AddContentStore = useAddContentStore();
const incomeCategory = computed(() => AddContentStore.incomeCategory);
const expenseCategory = computed(() => AddContentStore.expenseCategory);
const contents = reactive({
  date: '',
  type: '',
  category: '',
  amount: '',
  memo: '',
});

const categoryOptions = ref([]);

const allCategoryOptions = computed(() => ({
    입금: incomeCategory.value,
    출금: expenseCategory.value,
}));

const adjustDate = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    return localDate.toISOString().split('T')[0];
};

const addContentsHandler = () => {
    if (!contents.date || !contents.category || !contents.amount) {
        alert('모든 필드를 채워주세요');
        return;
    }
    const adjustedDate = adjustDate(contents.date);
    AddContentStore.addAC({ ...contents, date: adjustedDate }, () => {});
};
const resetForm = () => {
  contents.date = '';
  contents.type = '';
  contents.category = '';
  contents.amount = '';
  contents.memo = '';
  onTransactionTypeChange();
};

const deleteContent = () => {
    resetForm();
};

const onTransactionTypeChange = () => {
    categoryOptions.value = allCategoryOptions.value[contents.type] || [];
    contents.category = ''; // 카테고리 선택 초기화
};
// 초기 로드 시 카테고리 옵션 설정
watchEffect(() => {
    onTransactionTypeChange();
});
</script>
<style>
#acc {
  margin-top: 24px;
  margin-left: 10px;
  width: 97%;
  margin-right: px;
}
#cal {
  padding-top: 15px;
  margin-left: 30px;
}
#d3 {
  width: 92%;
}
#d4 {
  margin-top: -10px;
  margin-left: 30px;
  margin-right: 20px;
  margin-bottom: 30px;
}
#d5 {
  margin-bottom: -40px;
}
#d7 {
  margin-top: 150px;
}
</style>
