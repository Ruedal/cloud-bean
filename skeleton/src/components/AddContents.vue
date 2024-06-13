<!-- detail_tab 1번 컴포넌트 -->

<template>
    <div class="rounded-4 bg-light mb-4 mt-3 p-1">
        <div class="row">
            <!-- 날짜  -->
            <div id="cal" class="d-flex align-items-center gap-3">
                <span class="font-bold">날짜 선택</span>
                <VDatePicker v-model="contents.date">
                    <template #default="{ togglePopover }">
                        <button class="px-3 py-2 bg-dark text-white font-semibold rounded-4" @click="togglePopover">Select date</button>
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
                            <label for="transactionType">입금/출금</label>
                            <select v-model="selectedTransactionType" @change="onTransactionTypeChange" class="form-control" id="transactionType">
                                <option value="입금">입금</option>
                                <option value="출금">출금</option>
                            </select>
                        </div>
                        <div class="p-1 form-group col-md-4">
                            <label for="category">카테고리</label>
                            <select v-model="contents.category" class="form-control" id="category">
                                <option value="" selected>Choose...</option>
                                <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div class="p-1 form-group col-md-4">
                            <label for="amount">금액</label>
                            <input type="text" class="form-control" id="amount" v-model="contents.amount" />
                        </div>
                    </div>
                    <div class="p-1 form-group col-md-12">
                        <label>메모</label><br />
                        <textarea row="3" class="form-control" placeholder="메모를 입력하세요" v-model="contents.memo"></textarea>
                    </div>
                </div>
            </div>
            <div>
                <!-- 버튼 그룹 -->
                <div class="mt-4 form-group">
                    <button type="button" class="btn btn-outline-primary m-1" @click="resetForm">리 셋</button><br />
                    <button type="button" class="btn btn-outline-primary m-1" @click="deleteContent">삭 제</button><br />
                    <button type="button" class="btn btn-primary m-1" @click="addContentsHandler">등 록</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAddContentStore } from '@/stores/cloudBean.js';

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

const selectedTransactionType = ref('입금');
const categoryOptions = ref([]);

const allCategoryOptions = computed(() => ({
    입금: incomeCategory.value,
    출금: expenseCategory.value,
}));

const addContentsHandler = () => {
    if (!contents.date || !contents.category || !contents.amount) {
        alert('모든 필드를 채워주세요');
        return;
    }
    AddContentStore.addAC({ ...contents }, () => {});
};

const resetForm = () => {
    contents.date = '';
    contents.type = '';
    contents.category = '';
    contents.amount = '';
    contents.memo = '';
    selectedTransactionType.value = '입금';
    onTransactionTypeChange();
};

const deleteContent = () => {
    resetForm();
};

const onTransactionTypeChange = () => {
    categoryOptions.value = allCategoryOptions.value[selectedTransactionType.value] || [];
    contents.category = ''; // 카테고리 선택 초기화
};

// 초기 로드 시 카테고리 옵션 설정
watchEffect(() => {
    onTransactionTypeChange();
});
</script>
