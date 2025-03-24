<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
import { watch,ref,nextTick } from 'vue';
let LayOutSettingStore = useLayOutSettingStore();
let flag = ref(true);
watch(() => LayOutSettingStore.refresh,()=>{
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    });
});
defineOptions({ name: 'Main' })
</script>

<style scoped lang="scss">
/* 进入过渡开始状态 */
.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

/* 进入过渡生效时状态 */
.fade-enter-active {
  transition: all 0.3s ease-out;
}

/* 进入过渡结束状态 */
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* 离开过渡开始状态 */
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* 离开过渡生效时状态 */
.fade-leave-active {
  transition: all 0.3s ease-in;
}

/* 离开过渡结束状态 */
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>