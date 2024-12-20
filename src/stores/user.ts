import { defineStore } from 'pinia'
import type { StoreDefinition } from 'pinia'
import { login, logout } from '@/api/auth'
import type { LoginParams } from '@/api/auth'
import router from '@/router'

// 定义用户信息接口
interface UserInfo {
  id: number
  username: string
  email: string
  roles: string[]
}

// 定义 Store 的状态接口
interface UserState {
  id: number | null
  username: string | null
  email: string | null
  roles: string[]
  token: string
  isAuthenticated: boolean
}

// 使用选项式 API 定义 Store
export const useUserStore: StoreDefinition<
  'user',
  UserState,
  {
    isAdmin: (state: UserState) => boolean
  },
  {
    loginUser(loginData: LoginParams): Promise<boolean>
    logoutUser(): Promise<boolean>
    restoreUserSession(): boolean
    clearUserState(): void
  }
> = defineStore('user', {
  state: (): UserState => ({
    id: null,
    username: null,
    email: null,
    roles: [],
    token: localStorage.getItem('token') || '',
    isAuthenticated: false
  }),

  getters: {
    isAdmin: (state: UserState) => state.roles.includes('ADMIN')
  },

  actions: {
    async loginUser(loginData: LoginParams) {
      try {
        const response = await login(loginData)
        console.log('Login response:', response)
        
        if (response.code === 200 && response.data) {
          const { token, id, username, email, roles } = response.data
          
          // 保存用户信息到 localStorage
          const userInfo: UserInfo = { id, username, email, roles }
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          localStorage.setItem('token', token)
          
          // 更新状态
          this.$patch({
            token,
            id,
            username,
            email,
            roles,
            isAuthenticated: true
          })
          
          console.log('Store state after login:', {
            token: this.token,
            id: this.id,
            username: this.username,
            roles: this.roles,
            isAuthenticated: this.isAuthenticated
          })
          
          // 登录成功后跳转到个人信息页
          router.push('/profile')
          return true
        }
        return false
      } catch (error) {
        console.error('登录失败:', error)
        return false
      }
    },
    
    async logoutUser() {
      try {
        // 直接清除用户数据
        this.$patch({
          id: null,
          username: null,
          email: null,
          roles: [],
          token: '',
          isAuthenticated: false
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        
        // 跳转到登录页
        router.push('/login')
        
        return true
      } catch (error) {
        console.error('退出登录失败:', error)
        return false
      }
    },
    
    restoreUserSession(): boolean {
      try {
        const userInfoStr = localStorage.getItem('userInfo')
        const token = localStorage.getItem('token')
        
        if (!userInfoStr || !token) {
          return false
        }
        
        const userInfo: UserInfo = JSON.parse(userInfoStr)
        
        this.$patch({
          ...userInfo,
          token,
          isAuthenticated: true
        })
        
        console.log('Session restored:', {
          username: this.username,
          isAuthenticated: this.isAuthenticated
        })
        
        return true
      } catch (error) {
        console.error('恢复会话失败:', error)
        this.clearUserState()
        return false
      }
    },
    
    clearUserState() {
      this.$patch({
        id: null,
        username: null,
        email: null,
        roles: [],
        token: '',
        isAuthenticated: false
      })
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
  }
}) 