<script setup lang="ts">
import { ref } from 'vue'
import UserManagement from '@/components/admin/UserManagement.vue'

const activeMenu = ref('users')
</script>

<template>
  <div class="service-page">
    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <div class="menu-item">
        <router-link to="/service" class="menu-link">
          <span class="icon">🛠️</span>
          管理服务
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/destinations" class="menu-link">
          <span class="icon">🌍</span>
          管理景点
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/posts" class="menu-link">
          <span class="icon">📝</span>
          管理文章
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/users" class="menu-link">
          <span class="icon">👥</span>
          管理用户
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/personal-service" class="menu-link">
          <span class="icon">⚙️</span>
          个人服务
        </router-link>
      </div>
    </div>

    <!-- 右侧内容区 -->
    <div class="content">
      <UserManagement />
    </div>
  </div>
</template>

<style scoped>
.service-page {
  display: flex;
  min-height: calc(100vh - 60px);
}

.sidebar {
  width: 200px;
  background-color: #f8f9fa;
  padding: 1rem;
  border-right: 1px solid #e9ecef;
}

.menu-item {
  margin-bottom: 0.5rem;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #666;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s;
}

.menu-link:hover {
  background-color: #e9ecef;
  color: #1890ff;
}

.menu-link.router-link-active {
  background-color: #e6f7ff;
  color: #1890ff;
}

.icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.content {
  flex: 1;
  padding: 1.5rem;
  background-color: #fff;
}
</style> 