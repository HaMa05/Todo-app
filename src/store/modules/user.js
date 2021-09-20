import axios from "../config/axios-auth";

export default {
  namespaced: true,
  state: {
    token: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token;
      window.localStorage.setItem("token", state.token);
    },
    removeToken(state) {
      state.token = "";
      window.localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/login", user)
          .then((res) => {
            console.log(res);
            commit("setToken", res.data);
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async signup(_, user) {
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/register", user)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    async logout({ commit }) {
      commit("removeToken");
    },
  },
};
