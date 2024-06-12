<template>
  <div class="d-flex vh-100">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark flex-column align-items-center"
      style="width: 20%"
    >
      <a class="navbar-brand" href="#">목록</a>
      <div class="navbar-nav flex-column w-100">
        <a
          class="nav-link text-center"
          v-for="(item, index) in items"
          :key="index"
          :href="item.link"
        >
          {{ item.text }}
        </a>
      </div>
    </nav>
    <div class="flex-grow-1 p-4">
      <!-- 메인 콘텐츠 영역 -->
      <h1>Main Content</h1>
      <p>This is the main content area.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: '홈', link: '/' },
        { text: '거래 내역', link: '/History' },
        { text: '월별 요약', link: '/HomeSum' },
        { text: '프로필 설정', link: '/profile' },
      ],
    };
  },
};
</script>
<style scoped>
.nav-link {
  padding: 15px;
}
</style>
