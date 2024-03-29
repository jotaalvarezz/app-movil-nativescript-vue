import Vue from "nativescript-vue";

import Home from "./components/Home";

import RadSideDrawer from "nativescript-ui-sidedrawer/vue";

Vue.use(RadSideDrawer);

import store from "./store/index";
import Pager from "@nativescript-community/ui-pager/vue";

Vue.use(Pager);

import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';

Vue.use(TabsPlugin);

Vue.registerElement(
  "CardView",
  () => require("@nstudio/nativescript-cardview").CardView
);

Vue.registerElement(
  "Carousel",
  () => require("@nstudio/nativescript-carousel").Carousel
);

Vue.registerElement(
  "CarouselItem",
  () => require("@nstudio/nativescript-carousel").CarouselItem
);

Vue.registerElement(
  "VideoPlayer",
  () => require("nativescript-videoplayer").VideoPlayer
);

Vue.registerElement(
  "BarcodeScanner",
  () => require("nativescript-barcodescanner").BarcodeScannerView
);


import { TNSFontIcon, fonticon } from "nativescript-fonticon";

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  fa: "./assets/fontawesome.css",
};
TNSFontIcon.loadCss();

Vue.filter("fonticon", fonticon);

new Vue({
  render: (h) => h("frame", [h(Home)]),
  store,
}).$start();
