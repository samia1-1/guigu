<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item> 
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
          </el-form-item> 
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
  
<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue';
import {reactive,ref} from 'vue';
import useUserStore from '@/store/modules/user';
import {useRouter,useRoute} from 'vue-router';
import { ElNotification } from 'element-plus';
import {getTime} from '@/utils/time';
let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();
let loginForm = reactive({
  username:'admin',
  password:'111111'
})
let loginForms = ref();
let loading = ref(false);
const login = async () => {
  loading.value = true;
  try {
    // 先执行表单验证
    const valid = await new Promise<boolean>((resolve) => {
      loginForms.value.validate((valid) => resolve(valid));
    });
    if (!valid) {
      ElNotification({
        title: '验证失败',
        message: '请检查输入是否符合要求',
        type: 'error'
      });
      loading.value = false;
      return;
    }
    // 再调用登录接口
    const success = await userStore.userLogin(loginForm);
    if (success) {
      $router.push({path: Array.isArray($route.query.redirect) ? $route.query.redirect[0] : ($route.query.redirect as string) || '/'});
      ElNotification({
        title: `Hi,${getTime()}好`,
        message: '欢迎回来',
        type: 'success'
      });
    } else {
      ElNotification({
        title: '登录失败',
        message: '账号或密码错误',
        type: 'error'
      });
    }
  } catch (error: any) {
    ElNotification({
      title: '登录失败',
      message: error.message,
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
}
const validatorUserName =(rule:any,value,callback)=>{
  if(value.length >=5 ){
    callback();
  }else{
    callback(new Error('账号长度至少为五位且不得超过十位'));
  }
}
const validatorPassword =(rule:any,value,callback)=>{
  if(value.length>=6){
    callback();
  }else{
    callback(new Error('密码至少六位且最多十五位')); 
  }
}
const rules={
  username:[
    // {required:true,min:6,max:10,message:"账号长度至少为六位且不得超过十位",trigger:"change"}
    {trigger:'change',validator:validatorUserName}
  ],
  password:[
    // {required:true,min:6,max:15,message:"密码至少六位且最多十五位",trigger:"blur"}
    {trigger:'blur',validator:validatorPassword}
  ]
}
</script>

<style scoped lang="scss">
  .login_container {
    height: 100vh;
    width:100%;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    padding:40px;
    h1{
      color:white;
      font-size:40px;
    }
    h2{
      font-size:20px;
      color:white;
      margin:20px 0px;

    }
  }

  .login_form {
    width:80%;
    top:30vh;
    position: relative;
    background: url('@/assets/images/login_form.png') no-repeat;
    .login_btn{
      width: 100%;
    }
  }
</style>