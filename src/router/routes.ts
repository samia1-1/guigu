export const constantRoute = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
      icon: "Promotion",
    },
  },
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "",
      hidden: true,
      icon: "",
    },
    redirect: "/home",
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
      icon: "",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
    meta: {
      title: "任意路由",
      hidden: true,
      icon: "",
    },
  },
  {
    path: "/screen",
    name: "Screen",
    component: () => import("@/views/screen/index.vue"),
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Platform",
    },
  },
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        name: "User",
        component: () => import("@/views/acl/user/index.vue"),
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        name: "Role",
        component: () => import("@/views/acl/role/index.vue"),
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/permisson",
        name: "Permisson",
        component: () => import("@/views/acl/permission/index.vue"),
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "Monitor",
        },
      },
    ],
  },
  {
    path:'/product',
    name:'Product',
    component:()=>import('@/layout/index.vue'),
    meta:{
        title:'商品管理',
        hidden:false,
        icon:'Goods'
    },
    redirect:'/product/trademark',
    children:[
        {
            path:'/product/trademark',
            name:'Trademark',
            component:()=>import('@/views/product/trademark/index.vue'),
            meta:{
                title:'品牌管理',
                hidden:false,
                icon:'ShoppingCartFull',
            }
        },
        {
            path:'/product/attr',
            name:'Attr',
            component:()=>import('@/views/product/attr/index.vue'),
            meta:{
                title:'属性管理',
                hidden:false,
                icon:'ChromeFilled',
            }
        },
        {
            path:'/product/spu',
            name:'Spu',
            component:()=>import('@/views/product/spu/index.vue'),
            meta:{
                title:'SPU管理',
                hidden:false,
                icon:'Calendar',
            }
        },
        {
            path:'/product/sku',
            name:'Sku',
            component:()=>import('@/views/product/sku/index.vue'),
            meta:{
                title:'SKU管理',
                hidden:false,
                icon:'Orange',
            }
        }
    ]
  }
];
