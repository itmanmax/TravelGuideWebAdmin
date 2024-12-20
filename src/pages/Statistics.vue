<script setup lang="ts">
import ApiStatistics from '@/components/ApiStatistics.vue'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  if (!userStore.isAuthenticated || !userStore.isAdmin) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="statistics-page">
    <h2>API 访问统计</h2>
    <ApiStatistics v-if="userStore.isAuthenticated && userStore.isAdmin" />
  </div>
</template>

<style scoped>
.statistics-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}
</style> 