import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import UserHome from '../components/user/UserHome.vue'
import UserRegister from '../components/user/UserRegister.vue'
import UserLogin from '../components/user/UserLogin.vue'
Vue.use(Router)

export default new Router({
	routes:[
	{
		path:'/index',
		component:Index
	},{
		path: '/',
		redirect: '/index'
	},{
		path:'/userlogin',
		component:UserLogin
	},
	{
		path:'/userhome',
		component:UserHome
	},
	{
		path:'/userregister',
		component:UserRegister
	},
	{
		name:'home',
		path:'/',
		component: () => import('../components/admin/Home.vue'),
		meta: { title: 'home' },
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
		        path: '/adminTable',
		        component: () => import('../components/admin/page/AdminTable.vue'),
		        meta: { title: '管理员管理' }
		    },
		    {
				//用户管理组件
		        path: '/userTable',
		        component: () => import( '../components/admin/page/UserTable.vue'),
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
	},
	{
		name:'login',
		path:'/login',
		component: () => import('../components/admin/Login.vue'),
	}
	]
})