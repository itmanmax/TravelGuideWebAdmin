<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

onMounted(() => {
  if (!userStore.isAuthenticated) {
    console.log('Attempting to restore user session...')
    userStore.restoreUserSession()
  }
})
</script>

<template>
  <div class="app-container">
    <NavBar class="nav-fixed" />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.nav-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.main-content {
  flex: 1;
  margin-top: 60px; /* 导航栏的高度 */
  padding: 2rem;
  width: 100%;
  overflow-y: auto;
}
</style>
