/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//import VueRouterPermissions from "vue-router-permissions";
// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
// export const EventBus = new Vue();
// import eventBus from 'eventBus'
// Vue.prototype.$eventBus = eventBus

// import VueBus from 'vue-bus';
 
// Vue.use(Vuesax)
Vue.use(VueRouter)

// Theme Configurations
import '../themeConfig.js'

// API Calls
import './http/requests'

// mock
//import './fake-db/index.js'

// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Tailwind
import '@/assets/css/main.css'


// axios
import axios from "./axios.js"
Vue.prototype.$http = axios


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'



// Tailwind
import '@/assets/css/main.css'

// VeeValidate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// Vue.use(VueBus);


// Vuexy Admin Filters
import './filters/filters'

// PrismJS



// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
import 'vue-select/dist/vue-select.css';
import moment from 'moment'
import VueSocketIO from 'vue-socket.io';
import VueToastr from "vue-toastr";
import CKEditor from 'ckeditor4-vue';

Vue.use(VueToastr);
Vue.use(CKEditor);
// import createMultiTabState from 'vuex-multi-tab-state';
import visibility from 'vue-visibility-change';
Vue.use(visibility);

// Vue.use(Vuex);
// import { VueChatEmoji } from 'vue-chat-emoji';
// Vue.component("Emoji", VueChatEmoji);
// require("vue-chat-emoji/dist/vue-chat-emoji.min.css");

// Vue.use(Emoji);
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
import vueCountryRegionSelect from 'vue-country-region-select'
Vue.use(vueCountryRegionSelect)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://188.227.58.42:7000', //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);
// import VueSweetalert2 from 'vue-sweetalert2';

// import 'sweetalert2/dist/sweetalert2.min.css';

// Vue.use(VueSweetalert2);

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY HH:mm')
  }
})
Vue.filter('formatDatewithDate', function(value) {
  if (value) {
    return moment(String(value)).format('ddd DD MMM YYYY')
  }
})
Vue.filter('dateToTime', function(value) {
  if (value) {
    return moment(String(value)).format('hh:mm A')
  }
})
Vue.config.productionTip = false
import Toasted from 'vue-toasted';

Vue.use(Toasted);

new Vue({
    sockets: {
        connect: function () {
            console.log('socket connected from main')
        },
        // my_response: function (data) {
        //   EventBus.$emit('newMessageEvent',data)
        //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)',data)
        // },
        messageChannel(data) {
          console.log("hello socket messageChannel", data);
          // this.socketMessage = data
        },

    },
    // mounted() {
    //   // You are able to access plugin from everywhere via this.$toastr
    //   this.$toastr.defaultPosition = "toast-top-right";
    // },
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// document.addEventListener("visibilitychange", function() {
//       document.title = document.hidden ? "I'm away" : "I'm here";
// });