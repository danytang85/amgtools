import Vue from 'vue'
import App from './App'
import http from '@/components/utils/http.js';

Vue.prototype.apiServer = 'https://amg.tangping.net';
	
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}


import tools from './pages/plugin/home.vue'
Vue.component('cu-tools',tools)
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
