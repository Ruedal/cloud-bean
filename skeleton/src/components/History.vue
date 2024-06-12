<template>
  <div class="col-sm-7 row m-2">
    <div class="col p-3">
      <!-- 테이블 10행 5열에 추가 데이터는 1, 2, 3 목차형식으로 처리 -->
      <!-- 날짜별 필터 기능 / 카테고리별  필터 기능 날짜에 -->
      <!-- v-filter 를 셀렉트와 연계해서? 조건문으로 조건에 해당되지 않을 경우 HIDE -->
      <!-- 조건문으로 날짜와 카테고리를 &&사용해서 동시 조건 가능할것 같음 -->
      <table class="table table-sm">
        <thead class="table-active">
          <tr class="text-center">
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
              <!-- <select class="form-select form-select-sm text-center">
                <option selected disabled>날짜</option>
                <option value="1m">1월</option>
                <option value="2m">2월</option>
                <option value="3m">3월</option>
                <option value="4m">4월</option>
                <option value="5m">5월</option>
                <option value="6m">6월</option>
                <option value="7m">7월</option>
                <option value="8m">8월</option>
                <option value="9m">9월</option>
                <option value="10m">10월</option>
                <option value="11m">11월</option>
                <option value="12m">12월</option>
              </select> -->
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
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
          <Contents
            v-for="content in addContent"
            :key="content.date"
            :content="content"
          />

          <!-- <tr>
            <td class="text-center">2024-06-12</td>
            <td class="text-center">월급</td>
            <td class="text-end">4,213,000</td>
            <td class="text-end">0</td>
            <td class="text-center">추가 수당 받아서 기분이 좋다.</td>
          </tr>
          <tr>
            <td class="text-center">2024-06-12</td>
            <td class="text-center">식비</td>
            <td class="text-end">0</td>
            <td class="text-end">40,000</td>
            <td class="text-center">기분이 좋아서 저녁에 족발 먹었다.</td>
          </tr>
          <tr>
            <td class="text-center">2024-06-13</td>
            <td class="text-center">애견용품</td>
            <td class="text-end">0</td>
            <td class="text-end">50,000</td>
            <td class="text-center">
              사료, 간식, 배변패드, 장난감까지 알차게 구매했다.
            </td>
          </tr> -->
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
import { ref, computed } from 'vue';
import { useAddContentStore } from '@/stores/cloudBean.js';
// import TodoItem from '@/components/TodoItem.vue';
import Contents from '@/components/Contents.vue';

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

const AddContentStore = useAddContentStore();
// const { fetchAddContents } = AddContentStore.fetchAddContents;
const addContent = computed(() => AddContentStore.addContent);
// 임포트 해야할 것들 AddContents, incomeCategory, expenseCategory
</script>
