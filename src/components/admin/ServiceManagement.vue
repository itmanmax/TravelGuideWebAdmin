<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getAllServices } from '@/api/admin/services'
import type { Service } from '@/types/service'

const services = ref<Service[]>([])
const loading = ref(true)
const error = ref('')

const fetchServices = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await getAllServices()
    if (response.code === 200) {
      services.value = response.data.content
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    console.error('获取服务列表失败:', err)
    error.value = '获取服务列表失败'
    ElMessage.error('获取服务列表失败')
  } finally {
    loading.value = false
  }
}

const handleEdit = (service: Service) => {
  ElMessage({
    type: 'info',
    message: '编辑功能开发中...',
    duration: 2000
  })
}

const handleDelete = (service: Service) => {
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

const handleDashboard = () => {
  window.open('http://localhost:8080/admin/dashboard', '_blank')
}

onMounted(() => {
  fetchServices()
})
</script>

<template>
  <div class="service-management">
    <div class="header">
      <div class="left-actions">
        <button class="dashboard-btn" @click="handleDashboard">
          <span class="icon">🛠️</span> 管理仪表盘
        </button>
      </div>
      <div class="right-actions">
        <button class="add-btn" @click="handleAdd">
          <span class="icon">➕</span> 新增服务
        </button>
        <button class="refresh-btn" @click="fetchServices">
          <span class="icon">🔄</span> 刷新
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="service-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>描述</th>
            <th>价格</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.id }}</td>
            <td>{{ service.name }}</td>
            <td>{{ service.description }}</td>
            <td>¥{{ service.price }}</td>
            <td>
              <span :class="['status', service.status === 1 ? 'active' : 'inactive']">
                {{ service.status === 1 ? '正常' : '禁用' }}
              </span>
            </td>
            <td>{{ new Date(service.createdTime).toLocaleDateString() }}</td>
            <td class="actions">
              <button class="edit-btn" @click="handleEdit(service)">✏️</button>
              <button class="delete-btn" @click="handleDelete(service)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.service-management {
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.left-actions,
.right-actions {
  display: flex;
  gap: 1rem;
}

.dashboard-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #e6f7ff;
  color: #1890ff;
  transition: background-color 0.2s;
}

.dashboard-btn:hover {
  background-color: #bae7ff;
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

.service-table {
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