import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/admin/Login.vue'
import Home from '../components/admin/Home.vue'

Vue.use(Router)

export default new Router({
	routes:[{
		name:'login',
		path:'/login',
		component:Login
	},
	{
		name:'home',
		path:'/',
		component:Home,
		meta: { 
			title: '自述文件' ,
			},
		    children: [
		        {
					//首页管理组件
		            path: '/pageHome',
		            component: () => import( '../components/admin/page/PageHome.vue'),
		            meta: { title: '系统首页' }
		        },
		        {
					//图标管理组件
		            path: '/icon',
		            component: () => import( '../components/admin/page/Icon.vue'),
		            meta: { title: '自定义图标' }
		        },
		        {
					//管理员管理组件
		            path: '/adminM',
		            component: () => import('../components/admin/page/AdminM.vue'),
		            meta: { title: '管理员管理' }
		        },
		        {
					//用户管理组件
		            path: '/userM',
		            component: () => import( '../components/admin/page/UserM.vue'),
		            meta: { title: '用户管理' }
		        },
		        {
		            // 收入类型组件
		            path: '/incomeType',
		            component: () => import( '../components/admin/page/IncomeType.vue'),
		            meta: { title: '收入类型' }
		        },
		        {
		            // 支出类型组件
		            path: '/payType',
		            component: () => import( '../components/admin/page/PayType.vue'),
		            meta: { title: '支出类型' }
		        },
		        {
		            // 数据库管理组件
		            path: '/databaseM',
		            component: () => import('../components/admin/page/DatabaseM.vue'),
		            meta: { title: '数据库管理' }
		        }
		    ]
		}
	]
})