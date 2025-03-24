<template>
    <div class="tabber">
        <div class="tabbar_left">
            <Breadcrumb />
            
        </div>
        <div class="tabbar_right">
            <Setting />
        </div>
    </div>
</template>

<script setup lang="ts">
import { de } from 'element-plus/es/locales.mjs';
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
defineOptions({ name: 'Tabbar' })
</script>

<style scoped lang="scss">
.tabber {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image:linear-gradient(to right, #f0f0f0, #fff);
    .tabbar_left {
        display:flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right {
        display: flex;
        align-items: center;
    }
}
</style>