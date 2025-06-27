<template>
  <div class="main-container">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <!-- 使用路由实例的fullPath属性 -->
        <component :is="Component" :key="route.fullPath" />
      </template>
      <div v-else class="loading-placeholder">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>内容加载中...</span>
      </div>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineOptions } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@element-plus/icons-vue';

// 为组件实例类型添加$router属性
interface ComponentInstance {
  $route: {
    fullPath: string;
  };
}

const route = useRoute();

onMounted(() => {
  console.log('Main组件已挂载，当前路径:', route.path);
});

defineOptions({ name: 'Main' })
</script>

<style scoped lang="scss">
.main-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #909399;
  
  .el-icon {
    font-size: 30px;
    margin-bottom: 10px;
  }
}

/* 可以为各个路由页面组件单独添加过渡效果 */
:deep(.page-enter-active),
:deep(.page-leave-active) {
  transition: opacity 0.3s ease;
}

:deep(.page-enter-from),
:deep(.page-leave-to) {
  opacity: 0;
}
</style>