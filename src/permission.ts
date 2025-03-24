// 路由鉴权
import router from '@/router/index.js' 
import nprogress from 'nprogress'
import setting from './setting.js'
import 'nprogress/nprogress.css' // Progress 进度条样式
nprogress.configure({ showSpinner: false }) // NProgress Configuration
import useUserStore from '@/store/modules/user.js'
import pinia from './store/index.js'
let userStore = useUserStore(pinia);
let username = userStore.username;
// 全局前置守卫
router.beforeEach(async(to,from,next)=>{
    // 设置页面标题
    document.title = `${ setting.title + to.meta.title}`;
    nprogress.start();
    let token = userStore.token;
    if (token){
        if (to.path == "/login"){
            next({path:'/'});
        }else{
            // 如果有token不为login，放行
            if (username){
                next();
            }else{
                try{
                await userStore.userInfo()
                next();
                }catch(err){
                    // 如果获取用户信息失败，跳转到登录页
                    await userStore.userLogout()
                    next({path:'/login',query:{redirect:to.path}});
                }
            }
        }
    }else{
        if(to.path=="/login"){
            next();
        }else{
            next({path:'/login',query:{redirect:to.path}});
        }
    }
})

// 全局后置守卫
router.afterEach((to,from) => {
    nprogress.done();
})