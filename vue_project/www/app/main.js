import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import store from "./store";
import iView from 'iview';
Vue.use(iView);

new Vue({
    el:"#app",
    store,
    render:(h)=>h(App)
})