//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import router from '@/router/index.js'
import setting from './setting.js'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据,去判断用户是否登录成功
import useUserStore from './store/modules/user.js'
import pinia from './store/index.js'
import { nextTick } from 'vue'
// import { refreshView } from './utils/refresh-router.js'
import useLayOutSettingStore from './store/modules/setting.js'

const userStore = useUserStore(pinia)
const settingStore = useLayOutSettingStore(pinia)

// 添加路由状态标记，避免重复添加路由
let dynamicRoutesAdded = false

// 改进路由检查函数
function isRouteAccessible(to) {
  // 基本检查
  if (!to || typeof to.path !== 'string') return false;
  
  // 检查完整的路由匹配
  const routes = router.getRoutes();
  
  // 打印调试信息
  console.log(`检查路由[${to.path}]是否可访问:`, 
    routes.some(r => r.path === to.path || 
                 r.path.replace(/\/:[^/]+/g, '') === to.path.replace(/\/\d+/g, '')));
  
  // 检查是否存在匹配的路由记录
  return routes.some(r => {
    // 精确匹配路径
    if (r.path === to.path) return true;
    
    // 匹配路径模式 (处理动态路径参数)
    if (to.path.startsWith('/product/') && r.path.startsWith('/product/')) return true;
    if (to.path.startsWith('/acl/') && r.path.startsWith('/acl/')) return true;
    
    return false;
  });
}

//全局守卫:项目当中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to, from, next) => {
  console.log('导航开始:', to.path, '从:', from.path);
  document.title = `${setting.title} - ${to.meta.title}`
  //to:你将要访问那个路由
  //from:你从来个路由而来
  //next:路由的放行函数
  nprogress.start()
  //获取token,去判断用户登录、还是未登录
  const token = userStore.token
  //获取用户名字
  const username = userStore.username
  
  //用户登录判断
  if (token) {
    //登录成功,访问login,不能访问,指向首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //登录成功访问其余路由
      // 如果用户信息存在且路由已经添加，直接放行
      if (username && dynamicRoutesAdded) {
        next()
      } else {
        //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        try {
          //获取用户信息
          await userStore.userInfo()
          
          // 标记动态路由已添加
          dynamicRoutesAdded = true
          
          // 确保路由完全注册
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // 简化导航逻辑，不再强制刷新
          if (to.matched.length > 0) {
            next({ ...to, replace: true });
          } else {
            next({ path: '/' });
          }
        } catch (error) {
          //token过期:获取不到用户信息了
          //用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.userLogout()
          // 重置路由添加状态
          dynamicRoutesAdded = false
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 重置路由添加状态，确保用户登出后状态正确
    dynamicRoutesAdded = false
    
    //用户未登录判断
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

//全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
  
  // 移除此处的视图刷新逻辑，避免与transition冲突
  // 路由完成后自然会触发组件更新
})
