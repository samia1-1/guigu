/**
 * 路由刷新工具 - 用于解决动态路由挂载问题
 */
import { nextTick } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting.js';
import pinia from '@/store/index.js';
import router from '@/router/index.js';

const settingStore = useLayOutSettingStore(pinia);

/**
 * 触发视图刷新
 * @param delay 延迟时间(毫秒)
 */
export async function refreshView(delay = 0) {
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  // 切换刷新标志触发视图更新
  settingStore.refreshPage();
  return await nextTick();
}

/**
 * 强制重新解析当前路由
 * 这会触发完整的路由解析周期
 */
export async function reParseRoute() {
  const currentRoute = router.currentRoute.value;
  
  // 使用replace避免创建新的历史记录
  await router.replace({
    path: '/refresh-redirect',
    query: { redirect: currentRoute.fullPath }
  });
  
  // 短暂延迟后返回原路由
  await new Promise(resolve => setTimeout(resolve, 10));
  await router.replace(currentRoute.fullPath);
  
  // 确保视图更新
  await refreshView(50);
}

/**
 * 增强settingStore，添加刷新页面方法
 */
export function enhanceSettingStore() {
  // 添加刷新页面的方法
  settingStore.refreshPage = function() {
    this.refsh = !this.refsh;
    console.log('刷新触发:', this.refsh);
  };
  
  return settingStore;
}
