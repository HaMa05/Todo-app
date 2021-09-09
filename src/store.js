import Vue from 'vue';
import Vuex from 'vuex';
// import axios from './store/axios-auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    categories: [],
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token;
    },
    setToken(state) {
      axios.defaults.headers['x-access-token'] = state.token;
      window.localStorage.setItem('user', state.token);
    },
    setCategories(state, data) {
      state.categories = data;
    },
  },
  actions: {
    signup({ commit }, { username, password }) {
      axios
        .post('/auth/register', {
          username: username,
          password: password,
          returnSecureToken: true,
        })
        .then((res) => {
          console.log(res);
          commit('authUser', {
            token: res.data.token,
          });
        })
        .catch((error) => console.log(error));
    },
    login({ commit }, { username, password }) {
      axios
        .post('/auth/login', {
          username: username,
          password: password,
        })
        .then((res) => {
          commit('authUser', {
            token: res.data.token,
          });
          commit('setToken');
        })
        .catch((error) => {
          return error;
        });
    },
    logout({ commit }) {
      commit('authUser', {
        token: '',
      });
      localStorage.removeItem('user');
    },
    getData({ commit }, { url }) {
      axios
        .get(`${url}`)
        .then((res) => {
          commit('setCategorie', res.data.items);
        })
        .catch((error) => error);
    },
    putData(_, { id, name, url }) {
      axios
        .patch(`${url}/${id}`, {
          data: name,
          headers: {
            'x-access-token': this.state.token,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((res) => console.log(res));
    },
    postData(_, { url, name }) {
      axios
        .post(`${url}`, name, {
          headers: {
            'x-access-token': `${this.state.token}`,
          },
        })
        .then((res) => console.log(res));
    },
  },
  getters: {
    token(state) {
      if (state.token) {
        return true;
      } else {
        return false;
      }
    },
  },
});
