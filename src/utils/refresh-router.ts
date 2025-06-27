/**
 * 路由导航工具 - 简化版本，移除刷新逻辑
 */
import router from '@/router/index.js';

/**
 * 导航到指定路由
 * @param path 路由路径
 * @param replace 是否替换当前历史记录
 */
export function navigateTo(path, replace = false) {
  if (replace) {
    router.replace(path);
  } else {
    router.push(path);
  }
}

/**
 * 返回上一页
 */
export function goBack() {
  router.back();
}
