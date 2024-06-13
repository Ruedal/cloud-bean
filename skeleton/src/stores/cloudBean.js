import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAddContentStore = defineStore('addContent', () => {
  // 반응형 상태 - ref() -> 기본형 reactive() -> 참조형
  const BASEURI = '/api/addContent';
  const ICATEGORYURI = '/api/incomeCategory';
  const ECATEGORYURI = '/api/expenseCategory';
  const state = reactive({
    addContent: [],
    incomeCategory: [],
    expenseCategory: [],
  });

  //actions -> 함수, 기능

  // AddContent 목록을 조회합니다.

  const fetchAddContents = async () => {
    try {
      const response = await axios.get(BASEURI);
      // console.log(response);
      if (response.status === 200) {
        state.addContent = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러 발생 : ' + error);
    }
  };

  const fetchIncomeCategory = async () => {
    try {
      const response = await axios.get(ICATEGORYURI);
      // console.log(response);
      if (response.status === 200) {
        state.incomeCategory = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러 발생 : ' + error);
    }
  };

  const fetchExpenseCategory = async () => {
    try {
      const response = await axios.get(ECATEGORYURI);
      // console.log(response);
      if (response.status === 200) {
        state.expenseCategory = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러 발생 : ' + error);
    }
  };

  // 새로운 AddContent를 추가합니다.
  const addAC = async (
    { date, type, category, amount, memo },
    successCallback
  ) => {
    try {
      const payload = { date, type, category, amount, memo };
      const response = await axios.post(BASEURI, payload);
      if (response.status === 201) {
        state.addContent.push({ ...response.data });
        successCallback();
      } else {
        alert('Todo 추가 실패');
      }
    } catch (error) {
      alert('에러발생 : ' + error);
    }
  };

  // 기존 TodoItem을 삭제합니다.
  const deleteAC = async (id) => {
    try {
      const response = await axios.delete(BASEURI + `/${id}`);
      if (response.status === 200) {
        let index = state.addContent.findIndex((date) => date.id === id);
        state.addContent.splice(index, 1);
      } else {
        alert('Todo 삭제 실패');
      }
    } catch (error) {
      alert('에러발생 : ' + error);
    }
  };
  // const addContents = (todo) => {
  //   state.addContent.push({ id: new Date().getTime(), todo, done: false });
  // };

  // const toggleDone = (id) => {
  //   let index = state.addContent.findIndex((todo) => todo.id === id);
  //   state.addContent[index].done = !state.addContent[index].done;
  // };
  // 토글 기능 사용하려면 addContent에 부울린 추가

  // const deleteContents = (id) => {
  //   let index = state.addContent.findIndex((todo) => todo.id === id);
  //   state.addContent.splice(index, 1);
  // };

  // const doneCount = computed(() => {
  //   return state.todoList.filter((todoItem) => todoItem.done === true).length;
  // });
  // 부울린이 true인 객체의 갯수를 구해주는 함수

  //getter -> computed 계산된 속성
  const addContent = computed(() => state.addContent);
  const incomeCategory = computed(() => state.incomeCategory);
  const expenseCategory = computed(() => state.expenseCategory);

  return {
    addContent,
    incomeCategory,
    expenseCategory,
    fetchIncomeCategory,
    fetchExpenseCategory,
    fetchAddContents,
    addAC,
    deleteAC,
  };
});
//1 사용할 함수(기능)명 지정 2

// store에 들어갈 내용
// 함수(처리), 데이터(state), getter
