//插件模板
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = function (Vue) {
  axios.defaults.baseURL=''
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer