<template>
  <div class="d-flex vh-100">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark flex-column align-items-center"
      style="width: 20%"
    >
      <a class="navbar-brand" href="#">Brand</a>
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
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Services', link: '/services' },
        { text: 'Contact', link: '/contact' },
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
