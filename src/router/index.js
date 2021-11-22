import router from './routers'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getMenuApi} from '@/api/menu'
import {getUserInfoApi} from '@/api/person'
import {title} from '@/settings'
import {TraverseTree} from './TraverseTree'

NProgress.configure({showSpinner: false});

let layout = {
  name: 'index',
  path: '/index',
  redirect: "/home",
  component: () => import('@/layout'),
  children: [
    {
      name: 'home',
      path: '/home',
      meta: {title: '首页'},
      component: () => import('@/views/home')
    },
    {
      name: 'person',
      path: '/person',
      meta: {title: '个人中心'},
      component: () => import('@/views/person')
    },
    {
      name: 'carousel',
      path: '/carousel',
      meta: {title: '轮播图'},
      component: () => import('@/views/carousel')
    },
    {
      name: 'productCateList',
      path: '/productCate',
      meta: {title: '商品分类'},
      component: () => import('@/views/product/productCate')
    },
    {
      path: '/productAttrList',
      name: 'productAttrList',
      meta: {title: '列表 '},
      component: () => import('@/views/product/productAttr/productAttrList')
    },
    {
      path: '/updateProductAttr',
      name: 'updateProductAttr',
      meta: {title: '编辑属性列表 '},
      component: () => import('@/views/product/productAttr/updateProductAttr')
    },
    {
      path: '/addProductAttr',
      name: 'addProductAttr',
      meta: {title: '添加商品属性 '},
      component: () => import('@/views/product/productAttr/addProductAttr')
    },
    {
      name: 'productAttrCateList',
      path: '/productAttr',
      meta: {title: '商品类型'},
      component: () => import('@/views/product/productAttr'),
    },
    {
      name: 'productCateList',
      path: '/productCateList',
      meta: {title: '商品分类'},
      component: () => import('@/views/product/productCate'),
    },
    {
      name: 'addProductCate',
      path: '/addProductCate',
      meta: {title: '添加分类'},
      component: () => import('@/views/product/productCate/add'),
    },
    {
      name: 'updateProductCate',
      path: '/updateProductCate',
      meta: {title: '编辑分类'},
      component: () => import('@/views/product/productCate/update'),
    },
    {
      name: 'add',
      path: '/add',
      meta: {title: '添加商品'},
      component: () => import('@/views/product/product/add')
    },
    {
      name: 'updateProduct',
      path: '/updateProduct',
      meta: {title: '编辑商品'},
      component: () => import('@/views/product/product/update')
    },
    {
      name: 'productList',
      path: '/product',
      meta: {title: '商品列表'},
      component: () => import('@/views/product/product'),
      children: [  {
        path: 'add',
        name: 'add',
        meta: {title: '添加商品'},
        component: () => import('@/views/product/product/add')
      }]
    },
    {
      name: 'brandList',
      path: '/brandList',
      meta: {title: '品牌列表'},
      component: () => import('@/views/product/brand/index'),
    },
    {
      name: 'addBrand',
      path: '/addBrand',
      meta: {title: '添加品牌'},
      component: () => import('@/views/product/brand/add')
    },
    {
      name: 'updateBrand',
      path: '/updateBrand',
      meta: {title: '编辑品牌'},
      component: () => import('@/views/product/brand/update')
    },
    {
      name: 'error403',
      path: '/403',
      meta: {title: '403'},
      component: () => import('@/views/error/error403')
    },
    {
      name: 'redirect',
      path: '/redirect',
      meta: {title: ""},
      component: () => import('@/views/redirect')
    }
  ]
};

// 动态路由
// export function generateRouter() {
//   return new Promise((resolve, reject) => {
//     getUserInfoApi().then(result => {
//       const {user, roles} = result.resultParam.currentUser
//       store.dispatch('setUser', user)
//       store.dispatch('setRoles', roles)
//     });
//     getMenuApi()
//       .then(result => {
//         const menu = result.resultParam.content;
//         let tree = new TraverseTree(menu, layout)
//         store.dispatch('setMenu', menu);
//         store.dispatch('setSearchMenu', tree.getList());
//         store.dispatch('setHasGenerateRouter');
//         router.addRoutes([tree.getLayout()]);
//         router.addRoutes([{path: "*", redirect: "/404"}]);
//         resolve()
//       })
//       .catch(() => {
//         reject()
//       })
//   })
// }

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + title
  }
  let isLogin = store.getters.token;
  if (to.path === "/") {
    isLogin
      ? next('/home')
      : next('/login');
    return
  }
  if (to.path === "/login") {
    next();
    return;
  }
  if (!isLogin) {
    next('/login');
    return;
  }
  // if (
  //   process.env.NODE_ENV === 'production'
  //   && (to.path === "/system/menu" || to.path === "/system/role")
  // ) {
  //   next('/404');
  //   return
  // }
  if (store.getters.hasGenerateRouter) {
    next()
  } else {
    generateRouter();
    next()
  }
});

router.afterEach(() => {
  NProgress.done()
});
// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({y: 0}),
//   routes: constantRouterMap
// })

export default router
