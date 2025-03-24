<template>
    <el-button size="small" icon="Refresh" circle @click='()=>{LayOutSettingStore.refresh=!LayOutSettingStore.refresh}' />
    <el-button size="small" icon="FullScreen" circle @click='FullScreen' />
    <el-button size="small" icon="Setting" circle />
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
defineOptions({ name: 'Setting' })
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { useRouter,useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore()
const FullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        document.documentElement.requestFullscreen()
    }
}
const logout = async() => {
    await userStore.userLogout();
    $router.push({path: '/login',query: { redirect: $route.path }})
}
</script>

<style scoped lang="scss"></style>