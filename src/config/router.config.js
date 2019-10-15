// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/dashboard/content',
    children: [

      {
        path: '/dashboard/content',
        name: 'Content',
        // redirect: '/form/base-form',
        component: () => import('@/views/dashboard/content'),
        meta: {
          title: '首页',
          icon: 'home',
        },
      },
      {
        path: '/form/engineering',
        name: 'Engineering',
        // redirect: '/form/base-form',
        component: () => import('@/views/boss/Engineering'),
        meta: {
          title: '工程管理',
          icon: 'layout',
        },

      },
      // forms
      {
        path: '/form/base-form',
        name: 'BaseForm',
        // redirect: '/form/base-form',
        component: () => import('@/views/form/BasicForm'),
        meta: {
          title: '员工管理',
          icon: 'user',
        },

      },
      {
        path: '/check/check',
        name: 'check',
        hidden: true,
        // redirect: '/form/base-form',
        component: () => import('@/views/check/check'),
      
      },
      {
        path: '/form/engineering2',
        name: 'Engineering2',
        // redirect: '/form/base-form',
        component: () => import('@/views/boss/Engineering2'),
        meta: {
          title: '材料审核记录',
          icon: 'project',
        },

      },

    ],

  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


export const asyncRouterMap1 = [

  {
    path: '/',
    name: 'index1',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/dashboard/content',
    children: [{
        path: '/dashboard/content',
        name: 'Content',
        // redirect: '/form/base-form',
        component: () => import('@/views/dashboard/content'),
        meta: {
          title: '首页',
          icon: 'home',
        },
      },


      {
        path: '/manager',
        name: 'Manager',
        // redirect: '/form/base-form',
        component: () => import('@/views/manager/Engineering'),
        meta: {
          title: '材料申请',
          icon: 'project',
        },
      },
      {
        path: '/form/engineering1',
        name: 'Engineering1',
        // redirect: '/form/base-form',
        component: () => import('@/views/boss/Engineering1'),
        meta: {
          title: '我的工程',
          icon: 'layout',
        },

      },
  
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const asyncRouterMap2 = [

  {
    path: '/',
    name: 'index2',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/dashboard/content',
    children: [{
        path: '/dashboard/content',
        name: 'Content',
        // redirect: '/form/base-form',
        component: () => import('@/views/dashboard/content'),
        meta: {
          title: '首页',
          icon: 'home',
        },
      },


      {
        path: '/admin',
        name: 'admin',
        // redirect: '/form/base-form',
        component: () => import('@/views/admin/Engineering'),
        meta: {
          title: '材料汇总上报',
          icon: 'project',
        },
      },

      {
        path: '/historyAdmin',
        name: 'historyAdmin',
        // redirect: '/form/base-form',
        component: () => import('@/views/admin/Engineering1'),
        meta: {
          title: '材料申请审核记录',
          icon: 'project',
        },
      },

      {
        path: '/check/procurementCheck',
        name: 'procurementCheck',
        hidden: true,
        // redirect: '/form/base-form',
        component: () => import('@/views/check/procurementCheck'),
      
      },
      {
        path: '/check/application',
        name: 'application',
        hidden: true,
        // redirect: '/form/base-form',
        component: () => import('@/views/check/application'),
      
      },
      {
        path: '/check/tasking',
        name: 'tasking',
        hidden: true,
        // redirect: '/form/base-form',
        component: () => import('@/views/check/tasking'),
      
      },
      {
        path: '/check/historyTask',
        name: 'historyTask',
        hidden: true,
        // redirect: '/form/base-form',
        component: () => import('@/views/check/historyTask'),
      
      },
      {
        path: '/check/details',
        name: 'details',
        hidden: true,
        // redirect: '/form/base-form',
        component: () => import('@/views/check/details'),
      
      },



  //  {
  //       path: '/list',
  //       name: 'list',
  //       component: PageView,
  //       redirect: '/list/table-list',
  //       meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
  //       children: [
  //         {
  //           path: '/list/table-list/:pageNo([1-9]\\d*)?',
  //           name: 'TableListWrapper',
  //           hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
  //           component: () => import('@/views/list/TableList'),
  //           meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
  //         },
  //         {
  //           path: '/list/basic-list',
  //           name: 'BasicList',
  //           component: () => import('@/views/list/StandardList'),
  //           meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
  //         },
  //         {
  //           path: '/list/card',
  //           name: 'CardList',
  //           component: () => import('@/views/list/CardList'),
  //           meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
  //         },
  //         {
  //           path: '/list/search',
  //           name: 'SearchList',
  //           component: () => import('@/views/list/search/SearchLayout'),
  //           redirect: '/list/search/article',
  //           meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
  //           children: [
  //             {
  //               path: '/list/search/article',
  //               name: 'SearchArticles',
  //               component: () => import('../views/list/search/Article'),
  //               meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
  //             },
  //             {
  //               path: '/list/search/project',
  //               name: 'SearchProjects',
  //               component: () => import('../views/list/search/Projects'),
  //               meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
  //             },
  //             {
  //               path: '/list/search/application',
  //               name: 'SearchApplications',
  //               component: () => import('../views/list/search/Applications'),
  //               meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
  //             }
  //           ]
  //         }
  //       ]
  //     },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }

]












/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/user/login',
    // component: PageView,
    name: 'login',
    component: () => import( /* webpackChunkName: "user" */ '@/views/user/Login'),
    // redirect: '/user/login',
    hidden: true,

  },



  {
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
  },


]