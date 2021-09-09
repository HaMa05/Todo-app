import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Category from '../components/Category/Category.vue';
import Task from '../components/Task/Task.vue';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'App',
    component: Category,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
  },
  {
    path: '/task',
    name: 'Task',
    component: Task,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, _, next) {
  const { token } = store.state.user;
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  if (authRequired && !token) {
    return next('/login');
  }

  next();
});

export default router;
