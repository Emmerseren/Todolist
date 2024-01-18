<template>
  <div id="burger" class="float-right">
    <div
      class="flex flex-col items-center w-30 h-5.5 cursor-pointer justify-between"
      :class="{ open: isOpen }"
      @click="toggleMenu"
    >
      <div class="burger__bar w-7.5 h-1 mr-3vw bg-#333 rounded-10"></div>
      <div class="burger__bar w-7.5 h-1 mr-3vw bg-#333 rounded-10"></div>
      <div class="burger__bar w-7.5 h-1 mr-3vw bg-#333 rounded-10"></div>
    </div>

    <div
      v-if="isOpen"
      class="burger__menu absolute top-25 flex flex-col bg-black ml-30 w-0 z-1"
    >
      <a
        href="/"
        class="burger__item p-20 decoration-none text-10 text-burger bg-#264ed2 w-500px"
        >Panda fest</a
      >
      <a
        href="/side2"
        class="burger__item p-20 decoration-none text-10 text-burger bg-#395cd0 w-400px"
        >Todo liste</a
      >
      <a
        href="/side3"
        class="burger__item p-20 decoration-none text-10 text-burger bg-#5a76d1 w-300px"
        >Halløj</a
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import side2 from "~/pages/side2.vue";
import side3 from "~/pages/side3.vue";

const routes = {
  "/side2": side2,
  "/side3": side3,
};

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped>
/*#burger {
  float: right;
}*/
/*.burger__icon {
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 22px;
}*/

.burger__bar {
  /* width: 30px;
  height: 4px;
  background-color: #333;
  margin-right: 3vw;
  border-radius: 10px;*/
  transition: 0.5s;
}
.open .burger__bar:first-child {
  transform: rotate(-40deg) translate(-9px, 8px);
}

.open .burger__bar:nth-child(2) {
  opacity: 0;
}

.open .burger__bar:last-child {
  transform: rotate(40deg) translate(-5px, -4px);
}

/*.burger__menu {
  top: 90px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: black;
  margin-left: 30px;
  width: 0;
  z-index: 1;
}*/

.burger__item {
  /*padding: 40px;
  opacity: 0;
  font-size: 3vw;
  color: rgb(238, 238, 238);
  text-decoration: none;*/
  font-family: Arial, Helvetica, sans-serif;
  animation: fadeIn 0.5s forwards;
}

.burger__item:first-child {
  animation-delay: 0.2s;
  /*background-color: #264ed2;
  width: 500px;*/
}

.burger__item:nth-child(2) {
  animation-delay: 0.5s;
  /*background-color: #395cd0;
  width: 400px;*/
}

.burger__item:last-child {
  animation-delay: 0.8s;
  /* background-color: #5a76d1;
  width: 300px;*/
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(0);
  }
  to {
    opacity: 1;
    transform: translateX(-100%);
  }
}
</style>
