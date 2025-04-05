//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index.js'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type.js'
import type { UserState } from './types/type.js'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.js'
//引入路由(常量路由)
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes.js'

//引入深拷贝方法
//@ts-expect-error
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router/index.js'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
      username: '',
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: [],
    }
  },
  //异步|逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data as string)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result: userInfoReponseData = await reqUserInfo()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons

        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          result.data.routes,
        )

        // 调试信息
        console.log('用户权限路由:', result.data.routes);
        console.log('过滤后的异步路由:', userAsyncRoute);

        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]

        try {
          // 确保路由注册前清理同名路由
          const routesToAdd = [...userAsyncRoute, anyRoute];
          
          // 先移除所有可能存在的动态路由，避免重复和冲突
          ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku', 'Any'].forEach(name => {
            if (router.hasRoute(name)) {
              router.removeRoute(name);
            }
          });
          
          // 重新添加路由
          routesToAdd.forEach((route: any) => {
            router.addRoute(route);
            // 验证路由是否成功添加
            if (router.hasRoute(route.name)) {
              console.log(`✅ 路由已成功添加: ${route.name}`);
            } else {
              console.error(`❌ 路由添加失败: ${route.name}`);
            }
          });
          
          // 打印当前路由表进行验证
          console.log('当前路由表:', router.getRoutes());
          
          // 更长的延迟确保路由完全注册
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
          console.error('路由注册错误:', error);
        }

        return 'ok';
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout()
      if (result.code == 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
