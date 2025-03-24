import { defineStore } from "pinia";
import { reqLogin,reqUserInfo,reqLogout } from "@/api/user/index.js";
import type {loginFormData,loginResponseData,userInfoReponseData} from "@/api/user/type.js";
import { SET_TOKEN, GET_TOKEN } from "@/utils/token.js";
// 路由常量
import { constantRoute } from "@/router/routes.js";
let useUserStore = defineStore("User", {
    state: ()=> {
        return {
            token: GET_TOKEN() || "",
            // 菜单路由信息
            menuRoutes: constantRoute,
            username: "",
            avatar: "",
        };
    },
    actions: {
        async userLogin(data: loginFormData) {
            let result:loginResponseData = await reqLogin(data);
            if (result.code === 200) {
                this.token = result.data;
                SET_TOKEN(result.data as string);
                return true;
            } else {
                return false;
            }
        },
        async userInfo() {
            let result:userInfoReponseData = await reqUserInfo()
            if (result.code === 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'ok';
            }else {
                return Promise.reject(new Error(result.message));
            }
        },
        async userLogout(){
            let result = await reqLogout();
            if (result.code === 200) {    
                this.token = ""
                this.username = ""
                this.avatar = ""
                SET_TOKEN("")
                return 'ok'
            }else {
                return Promise.reject(new Error(result.message));
            }
        }
    },
    getters: {
        
    },
});
export default useUserStore;
