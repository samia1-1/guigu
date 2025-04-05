import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { constantRoute } from './routes.js'

// 创建路由实例前先进行调试输出
console.log('初始化路由配置:', constantRoute);

let router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoute as RouteRecordRaw[],
    scrollBehavior(){
        return {
            top:0,
            left:0,
            behavior:'smooth'
        }
    }
})

// 添加路由表变更监听，辅助调试
if (process.env.NODE_ENV !== 'production') {
    const routerAddOriginal = router.addRoute;
    router.addRoute = function(parentOrRoute, route?) {
        console.log('添加路由:', parentOrRoute, route ? route : '');
        return routerAddOriginal.call(this, parentOrRoute, route);
    };
}

// 添加全局错误处理，帮助捕获路由问题
router.onError((error) => {
    console.error('路由错误:', error);
});

export default router;