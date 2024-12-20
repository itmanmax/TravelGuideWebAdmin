<template>
  <div class="profile-page">
    <div class="profile-card">
      <h2>个人信息</h2>
      <div class="info-grid">
        <div class="info-item">
          <label>用户名：</label>
          <span>{{ userStore.username }}</span>
        </div>
        <div class="info-item">
          <label>邮箱：</label>
          <span>{{ userStore.email }}</span>
        </div>
        <div class="info-item">
          <label>角色：</label>
          <span>{{ userStore.roles.includes('ADMIN') ? '管理员' : '普通用户' }}</span>
        </div>
      </div>
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const handleLogout = async () => {
  const success = await userStore.logoutUser()
  if (success) {
    ElMessage({
      type: 'success',
      message: '退出登录成功',
      duration: 2000
    })
  } else {
    ElMessage.error('退出登录失败')
  }
}
</script>

<style scoped>
.profile-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

h2 {
  margin: 0 0 2rem;
  color: #333;
  font-size: 1.5rem;
}

.info-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: #fafafa;
  border-radius: 4px;
}

.info-item label {
  color: #666;
  font-weight: 500;
  width: 80px;
}

.info-item span {
  color: #333;
}

.logout-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #ff4d4f;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #ff7875;
}
</style> 