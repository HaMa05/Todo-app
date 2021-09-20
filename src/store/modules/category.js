import axios from '../config/axios-auth';

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    getCategories({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/categories')
          .then((res) => {
            commit('setCategories', res.data.items);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createCategory(_, { name }) {
      return new Promise((resolve, reject) => {
        axios
          .post('api/categories', {
            name,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    modifyCategory(_, { id, name }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`api/categories/${id}`, {
            name,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteCategory(_, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`api/categories/${id}`)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
