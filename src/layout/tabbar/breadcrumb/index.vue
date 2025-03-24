<template>
    <el-icon style="margin-right:10px;" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="{ path: item.path }">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span style="margin:0px 5px ;">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
defineOptions({ name: 'Breadcrumb' })
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting';
let LayOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold;
}
const $route = useRoute();
</script>

<style scoped lang="scss"></style>