import Vue from 'vue';
import App from './App.vue';

import alertFunction from './functions';
import { text1, text2 } from './text';

alertFunction(text1);
alertFunction(text2);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
