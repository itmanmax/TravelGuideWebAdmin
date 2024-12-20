<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const error = ref('')

const handleDashboard = () => {
  if (!userStore.isAuthenticated) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  
  window.open('https://travelsever1.maxtral.fun/admin/dashboard', '_blank')
}

const handleComingSoon = () => {
  ElMessage({
    message: '该功能正在开发中，敬请期待！',
    type: 'info',
    duration: 2000
  })
}
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
      <div class="service-card">
        <div class="header">
          <h2>个人服务</h2>
        </div>

        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="service-grid">
          <div class="service-item" @click="handleDashboard">
            <div class="icon">📊</div>
            <div class="title">管理仪表盘</div>
            <div class="description">查看系统运行状态和统计数据</div>
          </div>
          <div class="service-item" @click="handleComingSoon">
            <div class="icon">📱</div>
            <div class="title">移动端管理</div>
            <div class="description">手机APP管理功能（开发中）</div>
          </div>
          <div class="service-item" @click="handleComingSoon">
            <div class="icon">📈</div>
            <div class="title">数据分析</div>
            <div class="description">深度数据分析功能（开发中）</div>
          </div>
          <div class="service-item" @click="handleComingSoon">
            <div class="icon">🔔</div>
            <div class="title">消息通知</div>
            <div class="description">实时消息推送功能（开发中）</div>
          </div>
        </div>
      </div>
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

.service-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
}

h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.service-item {
  background-color: #fafafa;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.service-item:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.service-item .icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  font-size: 0.9rem;
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