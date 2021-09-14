import Vue from 'vue';
import Vuex from 'vuex';
import userModel from './modules/user';
import categoryModel from './modules/category';
import taskModel from './modules/task';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user: userModel,
    category: categoryModel,
    task: taskModel,
  },
});

const token = window.localStorage.getItem('token');
if (token) {
  store.commit('setToken', { token });
}

export default store;
