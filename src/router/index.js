import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index.vue'
import UserHome from '../components/user/UserHome.vue'
import UserRegister from '../components/user/UserRegister.vue'
import UserLogin from '../components/user/UserLogin.vue'
import ReportForm from '../components/user/pages/ReportForm.vue'
import UserIncomMsg from '../components/user/pages/UserIncomMsg.vue'
import UserPayMsg from '../components/user/pages/UserPayMsg.vue'

import PersonalInformation from '../components/user/pages/PersonalInformation.vue'


Vue.use(Router)

export default new Router({
	routes:[
	{
	    path: '/admin',
	    redirect: '/admin/pageHome'
	},	
	{
		name:'index',
		path:'/index',
		component:Index
	},
	{
		path: '/',
		redirect: '/index'
	},
	{
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
		path:'/reportform',
		component:ReportForm
	},
	
	
	{
		path:'/userincomemsg',
		component:UserIncomMsg
	},
	{
		path:'/userpaymsg',
		component:UserPayMsg
	},
	
	{
		path:'/personalinformation',
		component:PersonalInformation
	},
	
	{
		name:'home',
		path:'/',
		component: () => import('../components/admin/Home.vue'),
		meta: { title: 'home' },
		children: [
		    {
				//首页管理组件
		        path: '/admin/pageHome',
		        component: () => import( '../components/admin/page/PageHome.vue'),
		        meta: { title: '系统首页' }
		    },
		    {
				//用户管理组件
		        path: '/admin/userTable',
		        component: () => import( '../components/admin/page/UserTable.vue'),
		        meta: { title: '用户管理' }
		    },
		    {
		        // 收入类型组件
		        path: '/admin/incomeType',
		        component: () => import( '../components/admin/page/IncomeType.vue'),
		        meta: { title: '收入类型' }
		    },
		    {
		        // 支出类型组件
		        path: '/admin/payType',
		        component: () => import( '../components/admin/page/PayType.vue'),
		        meta: { title: '支出类型' }
		    },
		    {
		        // 数据库管理组件
		        path: '/admin/databaseM',
		        component: () => import('../components/admin/page/DatabaseM.vue'),
		        meta: { title: '数据库管理' }
		    }
		]
	},
	{
		name:'login',
		path:'/admin/login',
		component: () => import('../components/admin/Login.vue'),
	}
	]
})