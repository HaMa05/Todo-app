import axios from '../config/axios-auth';

export default {
  namespaced: true,
  state: {
    tasks: [],
    indexTask: null,
  },
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload;
    },
    getIndexTask(state, target) {
      state.indexTask = state.tasks.findIndex((el) => el.id === target);
    },
    replaceTasks(state, payload) {
      const task = payload.task;
      const index = state.indexTask;
      state.tasks.splice(index, 1, task);
    },
    addTask(state, task) {
      state.tasks = [task, ...state.tasks];
    },
  },
  actions: {
    async getTasks({ commit }, query) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/tasks', {
            params: query,
          })
          .then((res) => {
            commit('setTasks', res.data.items);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async createTask({ commit }, task) {
      return new Promise((resolve, reject) => {
        axios
          .post('api/tasks', task)
          .then((res) => {
            commit('addTask', res.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async modifyTask({ commit }, { id, task }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`api/tasks/${id}`, task)
          .then((res) => {
            commit('getIndexTask', id);
            commit('replaceTasks', { task: res.data });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async deleteTask({ state }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`api/tasks/${id}`)
          .then((res) => {
            state.tasks = state.tasks.filter((el) => el.id !== id);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    getTasksValue(state) {
      return state.tasks;
    },
  },
};
