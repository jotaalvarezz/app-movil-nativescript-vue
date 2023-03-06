import Vue from 'nativescript-vue'

import Home from './components/Home'

import store from './store/index'

Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

new Vue({
  render: (h) => h('frame', [h(Home)]),
  store,
}).$start()
