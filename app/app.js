import Vue from 'nativescript-vue'

import Home from './components/Home'

import store from './store/index'
import Pager from '@nativescript-community/ui-pager/vue';

Vue.use(Pager);

Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/fontawesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

new Vue({
  render: (h) => h('frame', [h(Home)]),
  store,
}).$start()
