import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

declare module 'vue-router/dist/vue-router' {
  export * from 'vue-router'
} 