import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router';
import '@/assets/css/reset.css'
import MyHttpServer from './plugins/http.js'
import echarts from 'echarts'

//1、导入axios
import axios from 'axios'
//2、挂载到vue原型上
Vue.prototype.$axios = axios
//3、配置请求的根路径
//axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'


//使用vue插件
Vue.use(ElementUI)
Vue.use(MyHttpServer)
//导入字体图标
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
