<template>
  <div id="app">
    <layout />
  </div>
</template>
<script>
import Layout from './views/Layout.vue';
export default {
  components: { Layout },
  data() {
    return {
      token: false,
    };
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}
</style>
