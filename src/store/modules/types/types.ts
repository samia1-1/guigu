import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type.js'
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}
//定义分类数据类型
export interface CategoryState {
  c1Arr: CategoryObj[] // 一级分类数据
  c2Arr: CategoryObj[] // 二级分类数据
  c3Arr: CategoryObj[] // 三级分类数据
  c1Id: string // 一级分类ID
  c2Id: string // 二级分类ID
  c3Id: string // 三级分类ID
}