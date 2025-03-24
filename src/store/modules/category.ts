import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr/index.js";
import type { CategoryResponseData } from "@/api/product/attr/type.js";
import type { CategoryState } from "@/store/modules/types/types.js";
let usecategoryStore = defineStore("category", {
  state: (): CategoryState => {
    return {
      c1Arr: [], // 一级分类数据
      c2Arr: [], // 二级分类数据
      c3Arr: [], // 三级分类数据
      c1Id: "", // 一级分类ID
      c2Id: "", // 二级分类ID
      c3Id: "", // 三级分类ID
    };
  },
  actions: {
    async getC1() {
      let result: CategoryResponseData = await reqC1();
      if (result.code === 200) {
        this.c1Arr = result.data;
      } else {
      }
    },
    async getC2() {
      let result: CategoryResponseData = await reqC2(this.c1Id);
      if (result.code === 200) {
        this.c2Arr = result.data;
      } else {
      }
    },
    async getC3() {
      let result: CategoryResponseData = await reqC3(this.c2Id);
      if (result.code === 200) {
        this.c3Arr = result.data;
      } else {
      }
    },
  },
});

export default usecategoryStore;
