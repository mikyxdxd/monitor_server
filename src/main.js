import Vue from 'vue';
import VueRouter from 'vue-router';
// require('./assets/parallaxjs/parallax.min')
// require('./assets/parallax/deploy/parallax.min')
Vue.use(VueRouter);
let app =Vue.extend({
  components:{
    w_header:require('./components/header/header.vue')
  }
});
import route from './route';
route(app);

