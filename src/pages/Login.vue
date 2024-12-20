<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>管理员登录</h2>
      <div class="form-group">
        <label for="username">用户名</label>
        <input 
          type="text" 
          id="username"
          v-model="loginForm.username"
          required
          autocomplete="username"
        >
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input 
          type="password" 
          id="password"
          v-model="loginForm.password"
          required
          autocomplete="current-password"
        >
      </div>
      <button type="submit">登录</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const error = ref('')

const loginForm = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    error.value = ''
    const success = await userStore.loginUser(loginForm.value)
    if (!success) {
      error.value = '登录失败，请检查用户名和密码'
      console.error('Login failed:', error.value)
    }
  } catch (err) {
    console.error('登录时发生错误:', err)
    error.value = '登录时发生错误，请稍后重试'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: #f44336;
  margin-top: 1rem;
  text-align: center;
}
</style> 