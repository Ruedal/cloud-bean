<template>
  <div id="calendarSection" class="container">
    <!-- 월별 합계 상자 -->
    <div class="summary-box card text-center mb-4 mt-4 p-3">
      <div class="card-body row">
        <div class="summary-item">
          <h5 class="card-title">입금</h5>
          <p class="card-text text-primary">{{ totalDeposit }} 원</p>
        </div>
        <div class="summary-item">
          <h5 class="card-title">출금</h5>
          <p class="card-text text-danger">{{ totalWithdrawal }} 원</p>
        </div>
        <div class="summary-item">
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
          <button
            type="button"
            class="btn btn-light btn-outline-secondary"
            @click="changeMonth(1)"
          >
            &gt;
          </button>
        </div>
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th v-for="index in week" :key="index">{{ index }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, i) in days" :key="i">
              <td v-for="day in week" :key="day" class="calendar-day">
                <div v-if="day !== null" class="day-content">
                  <span class="day-number">{{ day }}</span>
                  <div class="transaction-section">
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
                      </div>
                    </div>
                  </div>
                </div>
                <div class="summary-item">
                    <h5 class="card-title">출금</h5>
                    <p class="card-text text-danger">{{ totalWithdrawal }} 원</p>
                </div>
                <div class="summary-item">
                    <h5 class="card-title">합계</h5>
                    <p class="card-text text-dark">{{ balance }} 원</p>
                </div>
            </div>
        </div>

        <!-- 달력 상자 -->
        <div class="calendar-box card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between mb-3">
                    <button type="button" class="btn btn-light btn-outline-secondary" @click="changeMonth(-1)">&lt;</button>
                    <h5 class="card-title m-0 fw-bold fs-3">{{ calendarHeader }}</h5>
                    <button type="button" class="btn btn-light btn-outline-secondary" @click="changeMonth(1)">&gt;</button>
                </div>
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th v-for="index in week" :key="index">{{ index }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(week, i) in days" :key="i">
                            <td v-for="day in week" :key="day" class="calendar-day">
                                <div v-if="day !== null" class="day-content">
                                    <span class="day-number">{{ day }}</span>
                                    <div class="transaction-section">
                                        <div v-if="transactions[year] && transactions[year][month] && transactions[year][month][day]">
                                            <div v-if="transactions[year][month][day].deposit" class="text-primary transaction-detail">
                                                입금: {{ transactions[year][month][day].deposit }}
                                            </div>
                                            <div v-if="!transactions[year][month][day].deposit" class="text-primary transaction-detail">&nbsp;</div>
                                            <div v-if="transactions[year][month][day].withdrawal" class="text-danger transaction-detail">
                                                출금: {{ transactions[year][month][day].withdrawal }}
                                            </div>
                                            <div v-if="!transactions[year][month][day].withdrawal" class="text-danger transaction-detail">&nbsp;</div>
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
import { useAddContentStore } from '@/stores/cloudBean.js';

const today = ref(new Date());
const week = ref(['일', '월', '화', '수', '목', '금', '토']);
const calendarHeader = ref('');
const days = ref([]);
const transactions = ref({});
const year = ref(0);
const month = ref(0);
const addContentStore = useAddContentStore();
const { fetchAddContents } = addContentStore;
const addContent = computed(() => addContentStore.addContent);

const fetchTransactions = async () => {
    await fetchAddContents();
    const data = addContent.value;
    console.log(data);
    transactions.value = formatTransactions(data);
};

const formatTransactions = (data) => {
    const formattedTransactions = {};
    data.forEach((item) => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        // console.log(`${JSON.stringify(item)}`);

    if (!formattedTransactions[year]) {
      formattedTransactions[year] = {};
    }
    if (!formattedTransactions[year][month]) {
      formattedTransactions[year][month] = {};
    }
    if (!formattedTransactions[year][month][day]) {
      formattedTransactions[year][month][day] = { deposit: 0, withdrawal: 0 };
    }
    // console.log(`${JSON.stringify(item.amount)}`);
    if (item.type === '입금') {
      formattedTransactions[year][month][day].deposit += parseFloat(
        item.amount
      );
    } else if (item.type === '출금') {
      formattedTransactions[year][month][day].withdrawal += parseFloat(
        item.amount
      );
    }
  });
  return formattedTransactions;
};

const calendarImplementation = () => {
    days.value = [];
    year.value = today.value.getFullYear();
    month.value = today.value.getMonth();
    const startDayOfTheMonth = new Date(year.value, month.value, 1).getDay();
    const endDayOfTheMonth = new Date(year.value, month.value + 1, 0).getDate();
    const basicDays = Array.from({ length: endDayOfTheMonth }, (v, i) => i + 1);
    const emptyDays = Array(startDayOfTheMonth).fill(null);
    const combinedDays = [...emptyDays, ...basicDays];
    for (let i = 0; i < endDayOfTheMonth + startDayOfTheMonth; i += 7) {
        days.value.push(combinedDays.slice(i, i + 7));
    }
    calendarHeader.value = `${year.value}년 ${month.value + 1} 월`;
    addLastWeekEmptyDays();
};

const addLastWeekEmptyDays = () => {
  const daysLastIndex = days.value.length - 1;
  if (days.value[daysLastIndex].length !== 7)
    days.value[daysLastIndex].length = 7;
};

const changeMonth = (val) => {
    today.value = new Date(today.value.setMonth(today.value.getMonth() + val, 1));
    calendarImplementation();
    fetchTransactions();
};

const totalDeposit = computed(() => {
  if (
    !transactions.value[year.value] ||
    !transactions.value[year.value][month.value]
  ) {
    return 0;
  }
  return Object.values(transactions.value[year.value][month.value]).reduce(
    (acc, day) => acc + day.deposit,
    0
  );
});

const totalWithdrawal = computed(() => {
  if (
    !transactions.value[year.value] ||
    !transactions.value[year.value][month.value]
  ) {
    return 0;
  }
  return Object.values(transactions.value[year.value][month.value]).reduce(
    (acc, day) => acc + day.withdrawal,
    0
  );
});

const balance = computed(() => {
    return totalDeposit.value - totalWithdrawal.value;
});

onMounted(() => {
    calendarImplementation();
    fetchTransactions();
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
  border-radius: 8px;
}
.summary-item {
  flex: 1;
  margin-left: 30px;
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
