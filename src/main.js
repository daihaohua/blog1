import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
import {Loading} from 'element-ui';
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, /* { default global options } */)
//解决路由跳转的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//引入elements
import 'element-ui/lib/theme-chalk/index.css';
import  "./Elements"

//添加axios
import Axios from "axios"
Vue.prototype.Axios = Axios;
//配置axios拦截器
Axios.interceptors.request.use(function (config) {
    Loading.service({
        text:"加载数据中....."
    });
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
    // Do something with response data
    let loadingInstance = Loading.service({
        text:"加载数据中.....",
        background:"red"
    });
    loadingInstance.close();
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});




//注册成为全局组件
const TheLatestArticle = ()=>import("@/commonality/TheLatestArticle");
import BreadCrumb from "@/commonality/BreadCrumb";
// const BreadCrumb = ()=>import("@/commonality/BreadCrumb")

Vue.component("TheLatestArticle",TheLatestArticle);
Vue.component("BreadCrumb",BreadCrumb);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
