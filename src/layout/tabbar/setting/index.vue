<template>
    <el-button size="small" icon="Refresh" circle
        @click='() => { LayOutSettingStore.refsh = !LayOutSettingStore.refsh }' />
    <el-button size="small" icon="FullScreen" circle @click='FullScreen' />
    <el-popover placement="bottom" title="主题设置" :width="300" trigger="click">
        <el-form label-width="80px" size="small" class="theme-setting">
            <el-form-item label="主题颜色">
                <el-color-picker v-model="color" :predefine="predefineColors" show @change="setColor" :teleported="false"></el-color-picker>
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch v-model="dark" size="small" :active-icon="MoonNight" :inactive-icon="Sunny" inline-prompt @change="changeDark"></el-switch>
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button size="small" icon="Setting" circle></el-button>
        </template>
    </el-popover>
    <img :src="userStore.avatar" style="width:24px;height:24px;margin: 0px 10px; border-radius: 50%;" alt="未知" />
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon-right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineOptions({ name: 'Setting' })
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router'
import { MoonNight, Sunny } from '@element-plus/icons-vue'
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore()
//收集开关数据
const dark = ref(false)
const FullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        document.documentElement.requestFullscreen()
    }
}
const logout = async () => {
    await userStore.userLogout();
    $router.push({ path: '/login', query: { redirect: $route.path } })
}

const changeDark = () => {
    const html = document.documentElement
    dark.value ? html.className = 'dark' : html.className = ''
}
//颜色选择器
const color = ref('rgba(255, 69, 0, 1)')
const predefineColors = ref([
    //可选值
    'rgba(255, 69, 0, 1)',
    'rgba(255, 99, 71, 1)',
    'rgba(255, 215, 0, 1)',
    'rgba(0, 128, 0, 1)',
    'rgba(30, 144, 255, 1)',
    'rgba(75, 0, 130, 1)',
    'rgba(238, 130, 238, 1)',
    'rgba(255, 20, 147, 1)',
])
const setColor = (val: string) => {
    color.value = val
    const html = document.documentElement
    html.style.setProperty('--el-color-primary', val)
    }
</script>

<style lang="scss"></style>