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
import './permission.ts'
const app = createApp(App) 
app.use(gloablComponent);
app.use(ElementPlus, {
    locale: zhCn
})
app.use(router)
app.use(pinia)
app.mount('#app')

