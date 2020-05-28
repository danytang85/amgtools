import Vue from 'vue'
import App from './App'


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
