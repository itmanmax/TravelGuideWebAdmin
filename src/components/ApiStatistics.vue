<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getApiStatistics } from '@/api/statistics'
import type { ApiStatistic } from '@/types/statistics'

const statistics = ref<ApiStatistic[]>([])
const loading = ref(true)
const error = ref('')

const fetchStatistics = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await getApiStatistics()
    if (response.code === 200) {
      statistics.value = response.data
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    console.error('获取API统计数据失败:', err)
    error.value = '获取API统计数据失败'
    ElMessage.error('获取API统计数据失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStatistics()
})
</script>

<template>
  <div class="statistics-page">
    <div class="statistics-card">
      <div class="header">
        <h2>API访问统计</h2>
        <button class="refresh-btn" @click="fetchStatistics">
          <span class="icon">🔄</span> 刷新
        </button>
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="statistics-table">
        <table>
          <thead>
            <tr>
              <th>API路径</th>
              <th>访问次数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in statistics" :key="stat.path">
              <td>{{ stat.path }}</td>
              <td>{{ stat.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistics-page {
  padding: 2rem;
}

.statistics-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.refresh-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f0f0f0;
  color: #666;
  transition: background-color 0.2s;
}

.refresh-btn:hover {
  background-color: #d9d9d9;
}

.statistics-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

th {
  background-color: #fafafa;
  font-weight: 500;
  color: #666;
}

.method {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.method.get {
  background-color: #e6f7ff;
  color: #1890ff;
}

.method.post {
  background-color: #f6ffed;
  color: #52c41a;
}

.method.put {
  background-color: #fff7e6;
  color: #fa8c16;
}

.method.delete {
  background-color: #fff1f0;
  color: #ff4d4f;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #ff4d4f;
}
</style> 