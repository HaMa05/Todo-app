<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd">
    <div class="container d-flex justify-content-between">
      <div class="d-flex">
        <router-link class="navbar-brand navbar-brand" to="/">
          <img src="../../assets/images/logo.png" alt="" width="40" height="40" />
        </router-link>
        <div class="navbar-collapse">
          <div class="navbar-nav">
            <router-link class="nav-link" to="/category">Danh mục</router-link>
            <router-link class="nav-link" :to="{ path: 'task', query: { limit: 5, page: 1 } }">Công việc</router-link>
          </div>
        </div>
      </div>
      <div class="navbar-nav">
        <button type="button" class="btn btn-primary" @click="logout">Đăng xuất</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      nameNavbar: '',
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
      if (!this.$store.state.user.token) {
        this.$router.push('/login');
      }
    },
    active(nameNav) {
      this.nameNavbar = nameNav;
    },
  },
};
</script>