//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起控制
      refsh: false, //仓库这个属性用于控制刷新效果
    }
  },
  
  actions: {
    // 触发页面刷新的方法
    refreshPage() {
      this.refsh = !this.refsh;
      console.log('页面刷新触发:', Date.now());
    },
    
    // 切换菜单折叠状态
    toggleFold() {
      this.fold = !this.fold;
    }
  }
})

export default useLayOutSettingStore
