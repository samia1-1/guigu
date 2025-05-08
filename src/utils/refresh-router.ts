/**
 * 路由刷新工具 - 用于解决动态路由挂载问题
 */
import { nextTick } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting.js';
import pinia from '@/store/index.js';

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

// 简化路由刷新策略，不再使用复杂的路由重解析
export function enhanceSettingStore() {
  if (!settingStore.refreshPage) {
    settingStore.refreshPage = function() {
      this.refsh = !this.refsh;
      console.log('刷新标记更新:', this.refsh);
    };
  }
  
  return settingStore;
}
