<!-- detail_tab 1번 컴포넌트 -->

<template>
    <div class="rounded-4 bg-light mb-4 mt-3 p-1">
        <div class="row">
            <!-- 날짜  -->
            <div id="cal" class="d-flex align-items-center gap-3">
                <span class="font-bold">날짜 선택</span>
                <VDatePicker class="" v-model="date">
                    <template #default="{ togglePopover }">
                        <button class="px-3 py-2 bg-primary text-white font-semibold rounded-4" @click="togglePopover">Select date</button>
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
                            <select v-model="selectedCategory" class="form-control" id="category">
                                <option value="" selected>Choose...</option>
                                <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div class="p-1 form-group col-md-4">
                            <label for="inputZip">금액</label>
                            <input type="text" class="form-control" id="inputZip" />
                        </div>
                    </div>

                    <div class="">
                        <div class="p-1 form-group col-md-12">
                            <label>메모</label><br />
                            <textarea row="3" class="form-control" placeholder="메모를 입력하세요"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <!-- 버튼 그룹 -->
                <div class="mt-4 form-group">
                    <div>
                        <button type="button" class="btn btn-outline-primary m-1">리 셋</button><br />
                        <button type="button" class="btn btn-outline-primary m-1">삭 제</button><br />
                        <button type="button" class="btn btn-primary m-1">등 록</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, reactive, watchEffect } from 'vue';
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

const selectedTransactionType = ref('입금');
const selectedCategory = ref('');
const categoryOptions = ref([]);

const allCategoryOptions = reactive({
    입금: [
        { value: 'salary', text: '월급' },
        { value: 'allowance', text: '용돈' },
        { value: 'rent', text: '월세' },
        { value: 'interest', text: '이자' },
    ],
    출금: [
        { value: 'food', text: '식비' },
        { value: 'transport', text: '교통비' },
        { value: 'dues', text: '공과금' },
        { value: 'congrats', text: '경조사비' },
        { value: 'dog_supplies', text: '애견용품' },
    ],
});

const onTransactionTypeChange = () => {
    categoryOptions.value = allCategoryOptions[selectedTransactionType.value] || [];
    selectedCategory.value = ''; // 카테고리 선택 초기화
};

// 초기 로드 시 카테고리 옵션 설정
watchEffect(() => {
    onTransactionTypeChange();
});
</script>
