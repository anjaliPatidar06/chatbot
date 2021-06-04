import Vue from 'vue';
import Vuelidate from 'vuelidate';

import App from './app/App';

Vue.use(Vuelidate);

new Vue({
    el: '#app',
    render: h => h(App)
});
