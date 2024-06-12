<template>
  <div id="calendarSection" class="container">
    <!-- 월별 합계 상자 입금/totaldeposit 출금totalwithdrawal 합계balance-->
    <div class="summary-box card text-center mb-4 mt-3 p-1">
      <div class="card-body row">
        <div class="summary-item col">
          <h5 class="card-title">입금</h5>
          <p class="card-text text-primary">{{ totalDeposit }} 원</p>
        </div>
        <div class="summary-item col">
          <h5 class="card-title">출금</h5>
          <p class="card-text text-danger">{{ totalWithdrawal }} 원</p>
        </div>
        <div class="summary-item col">
          <h5 class="card-title">합계</h5>
          <p class="card-text text-dark">{{ balance }} 원</p>
        </div>
      </div>
    </div>

    <!-- 달력 상자 -->
    <div class="calendar-box card mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <button
            type="button"
            class="btn btn-light btn-outline-secondary"
            @click="changeMonth(-1)"
          >
            &lt;
          </button>
          <h5 class="card-title m-0 fw-bold fs-3">{{ calendarHeader }}</h5>
          <button type="button" class="btn btn-light btn-outline-secondary" @click="changeMonth(1)">
            &gt;
          </button>
        </div>
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th v-for="index in week" :key="index">
                {{ index }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- 주 단위로 달력의 행 생성 -->
            <tr v-for="(week, i) in days" :key="i">
              <td v-for="day in week" :key="day" class="calendar-day">
                <!-- day가 null이 아니면 각주의 일자 표시 -->
                <div v-if="day !== null" class="day-content">
                  <span class="day-number">{{ day }}</span>
                  <div class="transaction-section">
                    <!-- 해당 일자에 입출금 내역이 있으면 표시 -->
                    <div
                      v-if="
                        transactions[year] &&
                        transactions[year][month] &&
                        transactions[year][month][day]
                      "
                    >
                      <div
                        v-if="transactions[year][month][day].deposit"
                        class="text-primary transaction-detail"
                      >
                        입금: {{ transactions[year][month][day].deposit }}
                      </div>
                      <div
                        v-if="!transactions[year][month][day].deposit"
                        class="text-primary transaction-detail"
                      >
                        &nbsp;
                        <!-- 빈 줄 추가 -->
                      </div>
                      <div
                        v-if="transactions[year][month][day].withdrawal"
                        class="text-danger transaction-detail"
                      >
                        출금: {{ transactions[year][month][day].withdrawal }}
                      </div>
                      <div
                        v-if="!transactions[year][month][day].withdrawal"
                        class="text-danger transaction-detail"
                      >
                        &nbsp;
                        <!-- 빈 줄 추가 -->
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const today = ref(new Date()); // 오늘 날짜
const week = ref(['일', '월', '화', '수', '목', '금', '토']); // 요일 배열
const calendarHeader = ref(''); // 달력 헤더 (연도와 월 표시)
const days = ref([]); // 달력의 일자들
const transactions = ref({}); // 날짜별 입출금 내역
const year = ref(0); // 현재 연도
const month = ref(0); // 현재 월

const fetchTransactions = () => {
  // 데이터베이스에서 입출금 내역을 가져오는 실제 API 호출을 여기에 추가
  // 예시:
  // const year = year.value;
  // const month = month.value + 1; // 0부터 시작하므로 +1
  // fetch(`/api/transactions?year=${year}&month=${month}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     transactions.value = formatTransactions(data);
  //   });

  // 시연을 위한 샘플 데이터
  const sampleData = [
    { date: '2024-06-01', deposit: 1000, withdrawal: 0 },
    { date: '2024-06-01', deposit: 500, withdrawal: 0 },
    { date: '2024-06-01', deposit: 0, withdrawal: 600 },
    { date: '2024-07-01', deposit: 1500, withdrawal: 0 },
    { date: '2024-07-02', deposit: 0, withdrawal: 300 },
    { date: '2024-07-05', deposit: 500, withdrawal: 0 },
    // 더 많은 샘플 데이터 추가
  ];
  transactions.value = formatTransactions(sampleData);
};

const formatTransactions = (data) => {
  const formattedTransactions = {};
  data.forEach((item) => {
    // 연 월 일 추출
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // 해당 연 월의 객체가 없으면 생성, 일의 객체가 없으면 초기화 { 입금:0, 출금:0 }
    if (!formattedTransactions[year]) {
      formattedTransactions[year] = {};
    }
    if (!formattedTransactions[year][month]) {
      formattedTransactions[year][month] = {};
    }
    if (!formattedTransactions[year][month][day]) {
      formattedTransactions[year][month][day] = { deposit: 0, withdrawal: 0 };
    }
    // 해당 [연][월][일].입금or출금에 각각 입/출금 내역 누적
    formattedTransactions[year][month][day].deposit += item.deposit;
    formattedTransactions[year][month][day].withdrawal += item.withdrawal;
  });
  return formattedTransactions; // 연도, 월, 일자별 입출금 내역 반환
};

const calendarImplementation = () => {
  days.value = [];
  year.value = today.value.getFullYear(); // 현재 연도 설정
  month.value = today.value.getMonth(); // 현재 월 설정
  const startDayOfTheMonth = new Date(year.value, month.value, 1).getDay(); // 해당 월의 시작 요일
  const endDayOfTheMonth = new Date(year.value, month.value + 1, 0).getDate(); // 해당 월의 마지막 일자
  const basicDays = Array.from({ length: endDayOfTheMonth }, (v, i) => i + 1); // 1일부터 마지막 일자까지 배열 생성
  const emptyDays = Array(startDayOfTheMonth).fill(null); // 시작 요일까지 빈 칸 채우기
  const combinedDays = [...emptyDays, ...basicDays]; // 빈 칸과 일자를 합침
  for (let i = 0; i < endDayOfTheMonth + startDayOfTheMonth; i += 7) {
    days.value.push(combinedDays.slice(i, i + 7)); // 주 단위로 끊어서 days 배열에 추가
  }
  calendarHeader.value = `${year.value}년 ${month.value + 1} 월`; // 달력 헤더 설정
  addLastWeekEmptyDays();
};

// 마지막 주가 7일이 아니면 남은 칸 빈칸으로 7칸까지 출력
const addLastWeekEmptyDays = () => {
  const daysLastIndex = days.value.length - 1;
  if (days.value[daysLastIndex].length !== 7) days.value[daysLastIndex].length = 7; // 마지막 주가 7일이 아니면 빈 칸 추가
};

const changeMonth = (val) => {
  today.value = new Date(today.value.setMonth(today.value.getMonth() + val, 1)); // 월 변경
  calendarImplementation(); // 달력 다시 구현
  fetchTransactions(); // 새로운 월의 입출금 내역 가져옴
};

// 당월 입금 총액 계산, 없으면 0 리턴
const totalDeposit = computed(() => {
  if (!transactions.value[year.value] || !transactions.value[year.value][month.value]) {
    return 0;
  }
  // acc에 입금 내역 더해줌
  return Object.values(transactions.value[year.value][month.value]).reduce(
    (acc, day) => acc + day.deposit,
    0
  );
});
// 당월 출금 총액 계산, 없으면 0 리턴
const totalWithdrawal = computed(() => {
  if (!transactions.value[year.value] || !transactions.value[year.value][month.value]) {
    return 0;
  }
  // acc에 출금 내역 더해줌
  return Object.values(transactions.value[year.value][month.value]).reduce(
    (acc, day) => acc + day.withdrawal,
    0
  );
});

// 합계 = 입금 - 출금
const balance = computed(() => {
  return totalDeposit.value - totalWithdrawal.value;
});

onMounted(() => {
  calendarImplementation(); // 달력 구현
  fetchTransactions(); // 입출금 내역 가져옴
});
</script>

<style scoped>
#calendarSection {
  text-align: center;
  text-align: -webkit-center;
  text-align: -moz-center;
}
.table {
  width: 100%;
}
td {
  width: 100px; /* 칸 폭을 고정합니다 */
  height: 100px; /* 칸 높이를 고정합니다 */
  text-align: center;
  vertical-align: top; /* 상단에 위치하게 합니다 */
  /* padding: 2px; 글자 패딩을 줄입니다 */
}
.day-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2px; /* 글자 패딩을 줄입니다 */
}
.day-number {
  font-weight: bold;
}
.transaction-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 빈 줄을 포함하여 상단과 하단에 고정합니다 */
  text-align: left;
}
.transaction-detail {
  font-size: 1rem; /* 텍스트 크기를 작게 합니다 */
  width: 100%; /* 전체 폭을 채웁니다 */
}
.summary-box {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}
.summary-item {
  flex: 1;
}
.calendar-box {
  border-radius: 10px;
}
tr td:first-child,
tr th:first-child {
  color: red;
}
tr td:last-child,
tr th:last-child {
  color: blue;
}
.summary-box .card-title {
  font-size: 1.6rem;
}
.summary-box .card-text {
  font-size: 1.6rem;
}
</style>
