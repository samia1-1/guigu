<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <div v-if="Component && flag" class="component-wrapper">
        <keep-alive>
          <component :is="Component" :key="route.fullPath + refreshKey" />
        </keep-alive>
      </div>
      <div v-else class="loading-placeholder">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>内容加载中...</span>
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
import { watch, ref, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Loading } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const layoutStore = useLayOutSettingStore();
let flag = ref(false);
let refreshKey = ref(0); // 用于强制刷新组件

// 监听路由商店的刷新标记
watch(() => layoutStore.refsh, () => {
  // 先隐藏组件
  flag.value = false;
  refreshKey.value++; // 更新key强制刷新
  
  // 下一个DOM更新周期后再显示
  nextTick(() => {
    if (route.matched && route.matched.length > 0) {
      console.log('组件刷新成功:', route.path, '刷新键:', refreshKey.value);
      flag.value = true;
    } else {
      console.warn('路由未匹配，组件无法显示:', route.path);
    }
  });
});

// Vue底层渲染原理需要处理路由变化触发的组件创建
watch(() => route.fullPath, async (newPath, oldPath) => {
  if (newPath !== oldPath) {
    console.log(`路由变化: ${oldPath} -> ${newPath}`);
    
    // 重置视图状态
    flag.value = false;
    refreshKey.value++;
    
    // 给异步组件加载的时间
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // 确认路由是否匹配成功
    nextTick(() => {
      if (route.matched && route.matched.length > 0) {
        console.log('路由组件准备完成:', route.path);
        flag.value = true;
      } else {
        console.warn('路由组件未准备好:', route.path);
        // 继续等待一段时间再次检查
        setTimeout(() => {
          if (route.matched && route.matched.length > 0) {
            flag.value = true;
            console.log('延迟检测路由匹配成功:', route.path);
          }
        }, 200);
      }
    });
  }
}, { immediate: true });

// 组件挂载时确保页面能够正常显示
onMounted(() => {
  console.log('Main组件已挂载，当前路径:', route.path);
  
  // 组件挂载后检查路由匹配状态
  if (route.matched && route.matched.length > 0) {
    console.log('路由已匹配，准备显示内容');
    flag.value = true;
  } else {
    console.warn('主组件挂载时路由未匹配');
    
    // 尝试延迟检查并开启显示
    setTimeout(() => {
      if (router.hasRoute(route.name) || route.matched.length > 0) {
        flag.value = true;
        console.log('延迟检测后路由匹配成功');
      }
    }, 300);
  }
});

defineOptions({ name: 'Main' })
</script>

<style scoped lang="scss">
/* 进入过渡开始状态 */
.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

/* 进入过渡生效时状态 */
.fade-enter-active {
  transition: all 0.3s ease-out;
}

/* 进入过渡结束状态 */
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* 离开过渡开始状态 */
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* 离开过渡生效时状态 */
.fade-leave-active {
  transition: all 0.3s ease-in;
}

/* 离开过渡结束状态 */
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
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

// 添加组件包装器样式
.component-wrapper {
  width: 100%;
  height: 100%;
}
</style>