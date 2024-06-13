<template>
  <nav
    class="navbar flex-column navbar-expand-lg bg-dark navbar-dark mt-1 rounded-4"
    style="height: 100%"
  >
    <span class="navbar-brand">목록</span>
    <button class="navbar-toggler" type="button" @click="changeIsNavShow">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div :class="navClass">
      <ul class="navbar-nav flex-column text-center">
        <li class="nav-item">
          <router-link class="nav-link" to="/">홈</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/tab">거래 내역</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/monsum">월별 요약</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">프로필 설정</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup></script>
