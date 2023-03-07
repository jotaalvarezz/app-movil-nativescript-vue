import Vue from 'nativescript-vue'

import Home from './components/Home'

import store from './store/index'
import Pager from '@nativescript-community/ui-pager/vue';

Vue.use(Pager);

Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);


new Vue({
  render: (h) => h('frame', [h(Home)]),
  store,
}).$start()
