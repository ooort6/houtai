// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/content',
    children: [
     
      {
        path: '/dashboard/content',
        name: 'Content',
        // redirect: '/form/base-form',
        component:  () => import('@/views/dashboard/content'),
        meta: { title: '首页', icon: 'home', },
      },

      // forms
      {
        path: '/form/base-form',
        name: 'BaseForm',
        // redirect: '/form/base-form',
        component:  () => import('@/views/form/BasicForm'),
        meta: { title: '员工管理', icon: 'user', },
     
      },

      {
        path: '/plan/base-form',
        name: 'BaseForm1',
        // redirect: '/form/base-form',
        component:  () => import('@/views/plan/BasicForm'),
        meta: { title: 'Excel任务计划', icon: 'calendar', permission: [ 'form' ] },
      },
      {
        path: '/plan/boss-session',
        name: 'Session',
        // redirect: '/form/base-form',
        component:  () => import('@/views/plan/bossSession'),
        meta: { title: '消息中心', icon: 'message', permission: [ 'form' ] },
      },

      // other
      // {
      //   path: '/other',
      //   name: 'otherPage',
      //   component: PageView,
      //   meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
      //   redirect: '/other/icon-selector',
      //   children: [
      //     {
      //       path: '/other/icon-selector',
      //       name: 'TestIconSelect',
      //       component: () => import('@/views/other/IconSelectorView'),
      //       meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
      //     },
      //     {
      //       path: '/other/list',
      //       component: RouteView,
      //       meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
      //       redirect: '/other/list/tree-list',
      //       children: [
      //         {
      //           path: '/other/list/tree-list',
      //           name: 'TreeList',
      //           component: () => import('@/views/other/TreeList'),
      //           meta: { title: '树目录表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/edit-table',
      //           name: 'EditList',
      //           component: () => import('@/views/other/TableInnerEditList'),
      //           meta: { title: '内联编辑表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/user-list',
      //           name: 'UserList',
      //           component: () => import('@/views/other/UserList'),
      //           meta: { title: '用户列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/role-list',
      //           name: 'RoleList',
      //           component: () => import('@/views/other/RoleList'),
      //           meta: { title: '角色列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/system-role',
      //           name: 'SystemRole',
      //           component: () => import('@/views/role/RoleList'),
      //           meta: { title: '角色列表2', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/permission-list',
      //           name: 'PermissionList',
      //           component: () => import('@/views/other/PermissionList'),
      //           meta: { title: '权限列表', keepAlive: true }
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]


export const asyncRouterMap1 = [

  {
    path: '/',
    name: 'index1',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/content1',
    children: [
      {
        path: '/dashboard/content1',
        name: 'Content1',
        // redirect: '/form/base-form',
        component:  () => import('@/views/dashboard/content1'),
        meta: { title: '首页', icon: 'home', },
      },
      // {
      //   path: '/form/base-form',
      //   name: 'BaseForm2',
      //   // redirect: '/form/base-form',
      //   component:  () => import('@/views/form/stepForm/StepForm'),
      //   meta: { title: '首页1111', icon: 'user', },
      // },

      // forms
      // {
      //   path: '/form/base-form',
      //   name: 'BaseForm',
      //   // redirect: '/form/base-form',
      //   component:  () => import('@/views/form/BasicForm'),
      //   meta: { title: '员工管理', icon: 'user', permission: [ 'form' ] },
     
      // },

      {
        path: '/plan/base-form2',
        name: 'BaseForm2',
        // redirect: '/form/base-form',
        component:  () => import('@/views/plan/BasicForm1'),
        meta: { title: '提交记录', icon: 'project', },
      },

      {
        path: '/plan/base-form3',
        name: 'BaseForm3',
        // redirect: '/form/base-form',
        component:  () => import('@/views/dashboard/content3'),
        meta: { title: '通讯录', icon: 'solution', permission: [ 'form' ] },
      },

      {
        path: '/plan/boss-session',
        name: 'Session',
        // redirect: '/form/base-form',
        component:  () => import('@/views/plan/bossSession'),
        meta: { title: '消息中心', icon: 'message', permission: [ 'form' ] },
      },
    


      

      // other
      // {
      //   path: '/other',
      //   name: 'otherPage',
      //   component: PageView,
      //   meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
      //   redirect: '/other/icon-selector',
      //   children: [
      //     {
      //       path: '/other/icon-selector',
      //       name: 'TestIconSelect',
      //       component: () => import('@/views/other/IconSelectorView'),
      //       meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
      //     },
      //     {
      //       path: '/other/list',
      //       component: RouteView,
      //       meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
      //       redirect: '/other/list/tree-list',
      //       children: [
      //         {
      //           path: '/other/list/tree-list',
      //           name: 'TreeList',
      //           component: () => import('@/views/other/TreeList'),
      //           meta: { title: '树目录表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/edit-table',
      //           name: 'EditList',
      //           component: () => import('@/views/other/TableInnerEditList'),
      //           meta: { title: '内联编辑表格', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/user-list',
      //           name: 'UserList',
      //           component: () => import('@/views/other/UserList'),
      //           meta: { title: '用户列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/role-list',
      //           name: 'RoleList',
      //           component: () => import('@/views/other/RoleList'),
      //           meta: { title: '角色列表', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/system-role',
      //           name: 'SystemRole',
      //           component: () => import('@/views/role/RoleList'),
      //           meta: { title: '角色列表2', keepAlive: true }
      //         },
      //         {
      //           path: '/other/list/permission-list',
      //           name: 'PermissionList',
      //           component: () => import('@/views/other/PermissionList'),
      //           meta: { title: '权限列表', keepAlive: true }
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user/login',
    // component: PageView,
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
    // redirect: '/user/login',
    hidden: true,
   
  },

  

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
