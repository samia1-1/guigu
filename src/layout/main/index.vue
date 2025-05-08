<template>
  <!-- 移除外层transition，改用简单的条件渲染 -->
  <div class="main-container">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <!-- 仅对组件内容应用过渡效果 -->
        <component :is="Component" :key="$route.fullPath + refreshKey" />
      </template>
      <div v-else class="loading-placeholder">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>内容加载中...</span>
      </div>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
import { watch, ref, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Loading } from '@element-plus/icons-vue';

const route = useRoute();
const layoutStore = useLayOutSettingStore();
let refreshKey = ref(0); // 用于强制刷新组件

// 监听刷新标记
watch(() => layoutStore.refsh, () => {
  refreshKey.value++; // 更新key强制刷新
  console.log('组件刷新触发，刷新键:', refreshKey.value);
});

// 路由变化时自动更新key
watch(() => route.path, (newPath, oldPath) => {
  if (newPath !== oldPath) {
    console.log(`路由变化: ${oldPath} -> ${newPath}，触发刷新`);
    refreshKey.value++;
  }
}, { immediate: true });

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