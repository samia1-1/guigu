import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import gloablComponent from './components';
import 'virtual:svg-icons-register'
import "@/styles/index.scss"
import router from './router/index'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import pinia from './store/index.js';
// import { enhanceSettingStore } from './utils/refresh-router';
import './permission.ts'
//el暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css' 

// 增强设置仓库，添加刷新功能
// enhanceSettingStore();

const app = createApp(App) 
app.use(gloablComponent);
app.use(ElementPlus, {
    locale: zhCn
})
app.use(router)
app.use(pinia)

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('应用错误:', err);
  console.log('错误组件:', vm);
  console.log('错误信息:', info);
};
import {isHasButton} from '@/directive/has'
isHasButton(app)
app.mount('#app')



