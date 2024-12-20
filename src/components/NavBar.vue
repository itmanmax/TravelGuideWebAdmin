<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-brand">旅游攻略管理系统</div>
    <div class="nav-links">
      <template v-if="userStore.isAuthenticated">
        <a @click="navigateTo('/profile')">个人信息</a>
        <a @click="navigateTo('/service')">管理服务</a>
        <a v-if="userStore.isAdmin" @click="navigateTo('/statistics')">访问统计</a>
        <a @click="userStore.logoutUser()">退出登录</a>
      </template>
      <template v-else>
        <a @click="navigateTo('/login')">登录</a>
      </template>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 60px;
  background-color: #333;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style> 