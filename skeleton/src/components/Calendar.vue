<template>
  <div id="calendarSection">
    <div>
      <!-- 클릭하면 이전/다음 월로 이동 -->
      <button type="button" class="btn" @click="changeMonth(-1)">&lt;</button>
      {{ calendarHeader }}
      <button type="button" class="btn" @click="changeMonth(1)">&gt;</button>
    </div>
    <table class="text-left border">
      <thead class="text-center border">
        <tr>
          <!-- 요일 출력 -->
          <th v-for="index in week" :key="index">
            {{ index }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 주 단위로 달력의 행 생성 -->
        <tr v-for="(week, i) in days" :key="i">
          <!-- day가 null이 아니면 각주의 일자 표시 -->
          <td v-for="day in week" :key="day" class="border">
            <div v-if="day !== null">
              {{ day }}
              <!-- 해당 일자에 입출금 내역이 있으면 표시 -->
              <div
                v-if="
                  transactions[year] &&
                  transactions[year][month] &&
                  transactions[year][month][day]
                "
              >
                <!-- 입금 내역은 파랑, 출금 내역은 빨강으로 표시 -->
                <div
                  v-if="transactions[year][month][day].deposit"
                  style="color: blue"
                >
                  입금: {{ transactions[year][month][day].deposit }}
                </div>
                <div
                  v-if="transactions[year][month][day].withdrawal"
                  style="color: red"
                >
                  출금: {{ transactions[year][month][day].withdrawal }}
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data() {
    return {
      today: new Date(), // 오늘 날짜
      week: ['일', '월', '화', '수', '목', '금', '토'], // 요일 배열
      calendarHeader: '', // 달력 헤더 (연도와 월 표시)
      days: [], // 달력의 일자들
      transactions: {}, // 날짜별 입출금 내역
      year: 0, // 현재 연도
      month: 0, // 현재 월
    };
  },
  mounted() {
    this.calendarImplementation(); // 달력 구현
    this.fetchTransactions(); // 입출금 내역 가져옴
  },
  methods: {
    fetchTransactions() {
      // 데이터베이스에서 입출금 내역을 가져오는 실제 API 호출을 여기에 추가
      // 예시:
      // const year = this.year;
      // const month = this.month + 1; // 0부터 시작하므로 +1
      // fetch(`/api/transactions?year=${year}&month=${month}`)
      //   .then(response => response.json())
      //   .then(data => {
      //     this.transactions = this.formatTransactions(data);
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
      this.transactions = this.formatTransactions(sampleData);
    },
    formatTransactions(data) {
      const transactions = {};
      // 연 월 일 추출
      data.forEach((item) => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        // 해당 연도 월의 객체가 없으면 생성 일은 객체가 없으면 초기화{0:0}
        if (!transactions[year]) {
          transactions[year] = {};
        }
        if (!transactions[year][month]) {
          transactions[year][month] = {};
        }
        if (!transactions[year][month][day]) {
          transactions[year][month][day] = { deposit: 0, withdrawal: 0 };
        }
        // 해당 날짜에 입/출금액 누적
        transactions[year][month][day].deposit += item.deposit;
        transactions[year][month][day].withdrawal += item.withdrawal;
      });
      return transactions; // 연도, 월, 일자별 입출금 내역 반환
    },
    calendarImplementation() {
      this.days = [];
      this.year = this.today.getFullYear(); // 현재 연도 설정
      this.month = this.today.getMonth(); // 현재 월 설정
      const startDayOfTheMonth = new Date(this.year, this.month, 1).getDay(); // 해당 월의 시작 요일
      const endDayOfTheMonth = new Date(this.year, this.month + 1, 0).getDate(); // 해당 월의 마지막 일자
      const basicDays = Array.from(
        { length: endDayOfTheMonth },
        (v, i) => i + 1
      ); // 1일부터 마지막 일자까지 배열 생성
      const emptyDays = Array(startDayOfTheMonth).fill(null); // 시작 요일까지 빈 칸 채우기
      const combinedDays = [...emptyDays, ...basicDays]; // 빈 칸과 일자를 합침
      for (let i = 0; i < endDayOfTheMonth + startDayOfTheMonth; i += 7) {
        this.days.push(combinedDays.slice(i, i + 7)); // 주 단위로 끊어서 days 배열에 추가
      }
      this.calendarHeader = `${this.year}년 ${this.month + 1} 월`; // 달력 헤더 설정
      this.addLastWeekEmptyDays();
    },
    addLastWeekEmptyDays() {
      const daysLastIndex = this.days.length - 1;
      if (this.days[daysLastIndex].length !== 7)
        this.days[daysLastIndex].length = 7; // 마지막 주가 7일이 아니면 빈 칸 추가
    },
    changeMonth(val) {
      this.today = new Date(
        this.today.setMonth(this.today.getMonth() + val, 1)
      ); // 월 변경
      this.calendarImplementation(); // 달력 다시 구현
      this.fetchTransactions(); // 새로운 월의 입출금 내역 가져옴
    },
  },
};
</script>

<style>
#calendarSection {
  text-align: center;
  text-align: -webkit-center;
  text-align: -moz-center;
}
table {
  width: 100%;
}
td {
  width: 40px;
  height: 50px;
  text-align: center;
  vertical-align: baseline;
}
tr td:first-child,
tr th:first-child {
  color: red;
}
tr td:last-child,
tr th:last-child {
  color: blue;
}
</style>
