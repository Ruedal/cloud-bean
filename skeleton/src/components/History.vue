<template>
  <div id="hisli" class="col-sm-7 row m-2">
    <div class="col">
      <!-- 테이블 10행 5열에 추가 데이터는 1, 2, 3 목차형식으로 처리 -->
      <!-- 날짜별 필터 기능 / 카테고리별  필터 기능 날짜에 -->
      <!-- v-filter 를 셀렉트와 연계해서? 조건문으로 조건에 해당되지 않을 경우 HIDE -->
      <!-- 조건문으로 날짜와 카테고리를 &&사용해서 동시 조건 가능할것 같음 -->
      <table class="table table-sm border border-2 table-bordered">
        <thead class="table-active">
          <tr class="text-center table-thead-tr">
            <th>
              <div id="cal">
                <VDatePicker v-model="date">
                  <template #default="{ togglePopover }">
                    <button class="rounded-md" @click="togglePopover">
                      날짜
                    </button>
                  </template>
                </VDatePicker>
              </div>
            </th>
            <th>
              <select
                class="form-select form-select-sm text-center"
                name=""
                id=""
              >
                <option selected disabled>카테고리</option>
                <optgroup label="수입">
                  <option>월급</option>
                  <option>용돈</option>
                  <option>이자</option>
                  <option>월세</option>
                </optgroup>
                <optgroup label="지출">
                  <option>식비</option>
                  <option>교통비</option>
                  <option>공과금</option>
                  <option>경조사비</option>
                  <option>애견용품</option>
                </optgroup>
              </select>
            </th>
            <th class="text-end">수입</th>
            <th class="text-end">지출</th>
            <th class="text-center">메모</th>
            <th class="text-center">삭제</th>
          </tr>
        </thead>
        <tbody class="table-tbody">
          <Contents
            v-for="contents in addContent"
            :key="contents.id"
            :contents="contents"
          />
        </tbody>
      </table>
    </div>
  </div>
  <!-- 날짜 데이터, 카테고리 데이터, AddContents 데이터 가져와서 내용 바꾸기-->
  <!-- 화면 이쁘게 + 자리 잡을 수 있도록 리터치 하기-->
  <!-- AddContents && incomeCategory || expenseCategory 조건문 으로 필터링해서 숨기기 기능 사용 -->
  <!-- AddContents 한 줄에 클릭이벤트가 발생하면 AddContents.vue 부분에 AddContents 내용 불러오기 -->
</template>

<script setup>
import Contents from '@/components/Contents.vue';
import { ref, computed } from 'vue';
import { useAddContentStore } from '@/stores/cloudBean.js';

const AddContentStore = useAddContentStore();
const addContent = computed(() => AddContentStore.addContent);
// 임포트 해야할 것들 AddContents, incomeCategory, expenseCategory
// console.log(addContent);
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
</script>
<style>
/* .table-tbody {
  display: block;
  max-height: 800px;
  overflow-y: scroll;
}
.table-thead-tr {
  display: table;
  width: 100%;
  position: sticky;
  table-layout: fixed;
}
#hisli {
  width: 100%;
}
.table {
  table-layout: fixed;
}
</style>
