<template>
  <v-app>
    <div class="app">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
  .app {
    height: 100%;
    position: relative;
    width: 100vw;
  }

</style>
