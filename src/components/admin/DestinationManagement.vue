<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getDestinations } from '@/api/admin/destinations'
import type { Destination } from '@/types/destination'

const destinations = ref<Destination[]>([])
const loading = ref(true)
const error = ref('')

const fetchDestinations = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await getDestinations()
    if (response.code === 200) {
      destinations.value = response.data.content
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    console.error('获取景点列表失败:', err)
    error.value = '获取景点列表失败'
    ElMessage.error('获取景点列表失败')
  } finally {
    loading.value = false
  }
}

const handleEdit = (destination: Destination) => {
  ElMessage({
    type: 'info',
    message: '编辑功能开发中...',
    duration: 2000
  })
}

const handleDelete = (destination: Destination) => {
  ElMessage({
    type: 'info',
    message: '删除功能开发中...',
    duration: 2000
  })
}

const handleAdd = () => {
  ElMessage({
    type: 'info',
    message: '新增功能开发中...',
    duration: 2000
  })
}

onMounted(() => {
  fetchDestinations()
})
</script>

<template>
  <div class="destination-management">
    <div class="header">
      <button class="add-btn" @click="handleAdd">
        <span class="icon">➕</span> 新增景点
      </button>
      <button class="refresh-btn" @click="fetchDestinations">
        <span class="icon">🔄</span> 刷新
      </button>
    </div>

    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="destination-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>城市</th>
            <th>状态</th>
            <th>评分</th>
            <th>评论数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="destination in destinations" :key="destination.id">
            <td>{{ destination.id }}</td>
            <td>{{ destination.name }}</td>
            <td>{{ destination.city }}</td>
            <td>
              <span :class="['status', destination.status === 1 ? 'active' : 'inactive']">
                {{ destination.status === 1 ? '正常' : '禁用' }}
              </span>
            </td>
            <td>{{ destination.averageRating?.toFixed(1) || '暂无' }}</td>
            <td>{{ destination.commentCount }}</td>
            <td class="actions">
              <button class="edit-btn" @click="handleEdit(destination)">✏️</button>
              <button class="delete-btn" @click="handleDelete(destination)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.destination-management {
  width: 100%;
}

.header {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
}

.add-btn, .refresh-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.add-btn {
  background-color: #1890ff;
  color: white;
}

.add-btn:hover {
  background-color: #40a9ff;
}

.refresh-btn {
  background-color: #f0f0f0;
  color: #666;
}

.refresh-btn:hover {
  background-color: #d9d9d9;
}

.destination-table {
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

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.status.active {
  background-color: #e6f7ff;
  color: #1890ff;
}

.status.inactive {
  background-color: #fff1f0;
  color: #ff4d4f;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  padding: 0.25rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: none;
  font-size: 1.2rem;
}

.edit-btn:hover {
  background-color: #e6f7ff;
}

.delete-btn:hover {
  background-color: #fff1f0;
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