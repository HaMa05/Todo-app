import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import category from './modules/category';
import task from './modules/task';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    category,
    task,
  },
});

const token = window.localStorage.getItem('token');
if (token) {
  store.commit('user/setToken', { token });
}

export default store;
