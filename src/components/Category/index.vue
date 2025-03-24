<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" @change="handler1" style="width: 15vw" :disabled="scene === 1">
          <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
            :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" @change="handler2" style="width: 15vw" :disabled="scene === 1">
          <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
            :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" style="width: 15vw" :disabled="scene === 1">
          <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name"
            :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
onMounted(() => {
  getC1()
})
/// 从仓库获取一级分类
const getC1 = () => {
  categoryStore.getC1()
}

//一级菜单的change事件
const handler1 = () => {
  //清除二级分类和三级分类的值
  categoryStore.$patch({
    c2Id: '',
    c3Id: '',
    c3Arr: []
  })
  categoryStore.getC2();
}
//二级菜单的change事件
const handler2 = () => {
  //清除三级分类的值
  categoryStore.$patch({ 
    c3Id: ''
  })
  categoryStore.getC3();
}
defineProps(['scene'])
</script>

<style scoped lang="scss"></style>