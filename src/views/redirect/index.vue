<template>
  <div class="redirect-container">
    <el-icon class="is-loading redirect-icon"><Loading /></el-icon>
    <p>页面刷新中...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Loading } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const { redirect } = route.query;
  if (redirect) {
    router.replace(redirect as string);
  } else {
    router.replace('/');
  }
});
</script>

<style scoped>
.redirect-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.redirect-icon {
  font-size: 32px;
  margin-bottom: 16px;
  color: #409eff;
}
</style>
