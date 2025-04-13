<template>
  <div class="logo" v-if="setting.loginHidden">
    <img :src="setting.logo" />
    <p :class="{ 'collapsed': LayOutSettingStore.fold }">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting';
let LayOutSettingStore = useLayOutSettingStore()
defineOptions({ name: 'Logo' })
</script>

<style scoped lang="scss">
    .logo {
        width: 100%;
        height: $base-menu-logo-height;
        color: white;
        display: flex;
        align-items: center;
        padding: 10px;
        overflow: hidden;
        img {
            width: 40px;
            height: 40px;
        }
        p {
            font-size: $base-logo-title-fontSize;
            margin-left: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: 1;
            transition: all 0.3s ease;
            
            &.collapsed {
                max-width: 0;
                opacity: 0;
                margin-left: 0;
            }
        }
    }
</style>
