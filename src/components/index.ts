import SvgIcon from "@/components/SvgIcon/index.vue";
import Category from "@/components/Category/index.vue";
import type { App, Component } from "vue";
const components: { [name: string]: Component } = { SvgIcon, Category };
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
    for (const [keys, components] of Object.entries(ElementPlusIconsVue)) {
      app.component(keys, components);
    }
  },
};
