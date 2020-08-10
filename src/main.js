import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router';
import '@/assets/css/reset.css'
import MyHttpServer from './plugins/http.js'

//使用vue插件
Vue.use(ElementUI)
Vue.use(MyHttpServer)

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
