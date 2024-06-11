<template>
  <div class="calendar">
    <h2>
      <a href="#" v-on:click="onClickPrev(currentMonth)">◀</a>
      {{ currentYear }}년 {{ currentMonth }}월
      <a href="#" v-on:click="onClickNext(currentMonth)">▶</a>
    </h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <td v-for="(weekName, index) in weekNames" v-bind:key="index">
            {{ weekName }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in currentCalendarMatrix" :key="index">
          <td v-for="(day, index2) in row" :key="index2" style="padding: 20px">
            <span
              v-if="isToday(currentYear, currentMonth, day)"
              class="rounded"
            >
              {{ day }}
            </span>
            <span v-else>
              {{ day }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const weekNames = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
  '일요일',
];
const rootYear = 1904;
const rootDayOfWeekIndex = ref(4); // 2000년 1월 1일은 토요일
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1);
const cureentDay = ref(new Date().getDate());
const currentMonthStartWeekIndex = ref(null);
const currentCalendarMatrix = ref([]);
const endOfDay = ref(null);
const memoDates = ref([]);

const init = () => {
  currentMonthStartWeekIndex.value = getStartWeek(
    currentYear.value,
    currentMonth.value
  );
  endOfDay.value = getEndOfDay(currentYear.value, currentMonth.value);
  initCalendar();
};

const initCalendar = () => {
  currentCalendarMatrix.value = [];
  let day = 1;
  for (let i = 0; j < 7; j++) {
    if (i == 0 && j < currentMonthStartWeekIndex.value) {
      calendarRow.push('');
    } else if (day <= endOfDay.value) {
      calendarRow.push(day);
      day++;
    } else {
      calendarRow.push('');
    }
  }
  currentCalendarMatrix.value.push(calendarRow);
};
const getEndOfDay = (year, month) => {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return 29;
      } else {
        return 28;
      }
    default:
      console.log('unknown month ' + month);
      return 0;
  }
};

const getStartWeek = (targetYear, targetMonth) => {
  let year = rootYear;
  let month = 1;
  let sumOfDay = rootDayOfWeekIndex;
  while (true) {
    if (targetYear > year) {
      for (let i = 0; i < 12; i++) {
        sumOfDay += getEndOfDay(year, month + i);
      }
      year++;
    } else if (targetYear == year) {
      if (targetMonth > month) {
        sumOfDay += getEndOfDay(year, month);
        month++;
      } else if (targetMonth == month) {
        return sumOfDay % 7;
      }
    }
  }
};

const onClickPrev = (month) => {
  month--;
  if (month <= 0) {
    currentMonth.value = 12;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
  init();
};

const onClickNext = (month) => {
  month++;
  if (month > 12) {
    currentMonth.value = 1;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
  init();
};

const isToday = (year, month, day) => {
  let date = new Date();
  return (
    year == date.getFullYear() &&
    month == date.getMonth() + 1 &&
    day == date.getDate()
  );
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.today {
  background-color: yellow;
}
</style>
