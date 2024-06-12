<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark flex-column align-items-center rounded-4 mt-1"
    >
      <a class="navbar-brand" href="#">목록</a>
      <div class="navbar-nav flex-column">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: '홈', link: '/' },
        { text: '거래 내역', link: '/tab' },
        { text: '월별 요약', link: '/monsum' },
        { text: '프로필 설정', link: '/profile' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
