<template>
  <div class="layout">
    <Nav v-if="token" />
    <div class="mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav/Nav.vue";
export default {
  components: {
    Nav,
  },
  computed: {
    token() {
      return this.$store.state.user.token;
    },
  },
};
</script>

Nav
<style></style>
