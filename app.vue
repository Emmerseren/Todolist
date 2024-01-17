<template>
  <div id="app">
    <BurgerMenu />
    <RouterView />
  </div>
</template>

<script setup>
import BurgerMenu from "./components/BurgerMenu.vue";
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  margin-left: 3vw;
  padding-top: 3vw;
}
</style>
