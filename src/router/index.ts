import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { constantRoute } from './routes.js'

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
export default router;