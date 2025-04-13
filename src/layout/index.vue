<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{fold: LayOutSettingStore.fold}">
            <Logo />
            <!-- 展示菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="white" router :default-active="$route.path" unique-opened :collapse="LayOutSettingStore.fold">
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabber" :class="{fold: LayOutSettingStore.fold}">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{fold: LayOutSettingStore.fold}">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'

import useUserStore from '@/store/modules/user'
let userStore = useUserStore();

import useLayOutSettingStore from '@/store/modules/setting';
let LayOutSettingStore = useLayOutSettingStore()

let $route=useRoute();

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition:all 0.3s;

        &.fold {
            width: $base-menu-min-width;
        }
        
        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabber {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0;
        left: $base-menu-width;
        transition:all 0.3s;

        &.fold{
            width:calc(100vw - $base-menu-min-width);
            left:$base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition:all 0.3s;
        &.fold{
            width:calc(100vw - $base-menu-min-width);
            left:$base-menu-min-width;
        }
    }
}
</style>