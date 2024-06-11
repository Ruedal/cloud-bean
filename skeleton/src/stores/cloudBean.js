import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAddContentStore = defineStore('addContent', () => {
  // 반응형 상태 - ref() -> 기본형 reactive() -> 참조형
  const state = reactive({
    addContent: [],
  });

  //actions -> 함수, 기능

  const addContents = (todo) => {
    state.addContent.push({ id: new Date().getTime(), todo, done: false });
  };
  // const toggleDone = (id) => {
  //   let index = state.addContent.findIndex((todo) => todo.id === id);
  //   state.addContent[index].done = !state.addContent[index].done;
  // };
  // 토글 기능 사용하려면 addContent에 부울린 추가
  const deleteContents = (id) => {
    let index = state.addContent.findIndex((todo) => todo.id === id);
    state.addContent.splice(index, 1);
  };

  // const doneCount = computed(() => {
  //   return state.todoList.filter((todoItem) => todoItem.done === true).length;
  // });
  // 부울린이 true인 객체의 갯수를 구해주는 함수

  //getter -> computed 계산된 속성
  const addContent = computed(() => state.addContent);

  return { addContent, addContents, deleteContents };
});
//1 사용할 함수(기능)명 지정 2

// store에 들어갈 내용
// 함수(처리), 데이터(state), getter
