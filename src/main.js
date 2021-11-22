import Vue from "vue";
import router from "./router"; // 路由
import store from "./store"; // vuex
import EVueContextmenu from 'e-vue-contextmenu'; // 右键菜单
import "./styles/init.css"; // 样式初始化
import "./styles/global.css"; // 全局样式
import './utils/EUI'; // element-ui
import './utils/directive'; // 指令
import './utils/filter'; // 过滤器
import '@riophae/vue-treeselect/dist/vue-treeselect.css'; // 树状选择器
import './assets/icons'; // svg
import App from "./App.vue";

Vue.use(EVueContextmenu);
// Vue.prototype.$fileSaver = require('file-saver'); // 下载文件

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
