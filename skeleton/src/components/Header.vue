<template>
    <div>
        <nav class="navbar navbar-sm bg-dark navbar-dark rounded-4">
            <span class="navbar-brand ps-2">Cloud Bean</span>
        </nav>
        <div class="d-flex vh-100">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark flex-column align-items-center rounded-4 mt-1" style="width: 20%">
                <a class="navbar-brand" href="#">목록</a>
                <div class="navbar-nav flex-column w-100">
                    <a class="nav-link text-center" v-for="(item, index) in items" :key="index" :href="item.link">
                        {{ item.text }}
                    </a>
                </div>
            </nav>
            <div class="flex-grow-1 p-4">
                <!-- 메인 콘텐츠 영역 -->
                <h1>Main Content</h1>
                <p>This is the main content area.</p>
                <Home />
            </div>
        </div>
    </div>
</template>

<script>
import Home from '@/pages/Home.vue';

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
