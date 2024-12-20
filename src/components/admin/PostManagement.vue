<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getAllPosts } from '@/api/admin/posts'
import type { Post } from '@/types/post'

const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref('')

const fetchPosts = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await getAllPosts()
    if (response.code === 200) {
      posts.value = response.data.content
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    console.error('获取文章列表失败:', err)
    error.value = '获取文章列表失败'
  } finally {
    loading.value = false
  }
}

const handleEdit = (post: Post) => {
  ElMessage({
    type: 'info',
    message: '编辑功能开发中...',
    duration: 2000
  })
}

const handleDelete = (post: Post) => {
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
  fetchPosts()
})
</script>

<template>
  <div class="post-management">
    <div class="header">
      <button class="add-btn" @click="handleAdd">
        <span class="icon">➕</span> 新增文章
      </button>
      <button class="refresh-btn" @click="fetchPosts">
        <span class="icon">🔄</span> 刷新
      </button>
    </div>

    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="post-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>作者</th>
            <th>城市</th>
            <th>分类</th>
            <th>状态</th>
            <th>浏览量</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.user.nickname }}</td>
            <td>{{ post.city }}</td>
            <td>{{ post.category }}</td>
            <td>
              <span :class="['status', post.status === 1 ? 'active' : 'inactive']">
                {{ post.status === 1 ? '已发布' : '草稿' }}
              </span>
            </td>
            <td>{{ post.viewCount }}</td>
            <td>{{ new Date(post.createdTime).toLocaleDateString() }}</td>
            <td class="actions">
              <button class="edit-btn" @click="handleEdit(post)">✏️</button>
              <button class="delete-btn" @click="handleDelete(post)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.post-management {
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

.post-table {
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