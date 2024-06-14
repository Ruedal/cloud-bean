<template>
  <div
    id="prftop"
    class="d-flex justify-content-center align-item-center win-vh-100"
  >
    <form
      @submit.prevent="submitProfile"
      class="card p-2"
      style="margin: 10px; width: 100%"
    >
      <h4 style="margin-top: 20px">프로필 설정</h4>
      <label for="image">
        <div class="card" ref="card">
          <img
            class="card-img-top"
            :src="profileImage"
            alt="프로필 이미지를 선택해주세요"
          />
          <div class="card-body"></div>
        </div>
      </label>
      <input type="file" id="image" @change="onFilechange" accept="image/*" />
      <label for="name">이름 :</label>
      <input type="text" id="name" v-model="profile.name" required />

      <label for="email">이메일 :</label>
      <input type="email" id="email" v-model="profile.email" required /><br />
      <button @click="submitProfileOnClick">프로필 등록</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      profile: {
        name: '',
        email: '',
      },
      profileImage: '', //추가: 프로필 이미지 URL을 저장할 변수
    };
  },
  methods: {
    submitProfile() {
      axios
        .post('http://localhost:3000/profiles', this.profile)
        .then((response) => {
          console.log('프로필 등록 완료:', response.data);
          // 등록 후 어떤 동작을 수행할 수 있습니다 (예: 사용자에게 성공 메시지 표시)
        })
        .catch((error) => {
          console.error('프로필 등록 에러:', error);
        });
    },
    submitProfileOnClick() {
      // 클릭 이벤트 핸들러로 등록된 버튼을 클릭할 때 호출되는 메서드
      this.submitProfile(); // submitProfile 메서드 호출
    },
    onFilechange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileImage = URL.createObjectURL(file);
        // 여기에서 this.profileImage를 사용하여 이미지 미리보기 업데이트
        // 이미지를 로드하여 카드의 크기를 조정
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const cardWidth = 250; // 원하는 카드의 너비 설정
          const cardHeight = cardWidth / aspectRatio;
          this.$refs.card.style.width = `${cardWidth}px`;
          this.$refs.card.style.height = `${cardHeight}px`;
        };
        img.src = this.profileImage;
      }
    },
  },
};
</script>
<style>
/* 이미지와 텍스트 입력 요소 사이 간격 조정 */
label {
  margin-top: 60px;
  margin-bottom: 10px; /* 아래로 간격 추가 */
}
.card {
  max-width: 100%; /* 카드의 최대 너비 설정 */
  height: auto; /* 높이는 자동으로 조정하여 이미지 비율을 유지하도록 설정 */
  display: flex; /* 내부 컨텐츠를 세로 중앙 정렬하기 위해 사용 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}
.card-img-top {
  max-width: 100%; /* 이미지 최대 너비 설정 */
  height: auto; /* 이미지 높이 자동 조정 */
}
#image {
  margin-left: 100px;
}
#prftop {
  margin-top: 13px;
  margin-bottom: -5px;
}
</style>
