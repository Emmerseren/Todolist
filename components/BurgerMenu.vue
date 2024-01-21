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
      class="burger__menu absolute top-25 flex bg-red flex-col bg-black ml-30 w-0"
    >
      <TransitionGroup name="burger">
        <a
          v-if="isOpen"
          href="/"
          :style="{ 'transition-delay': isOpen ? '0.3s' : '0s' }"
          class="burger__item p-20 decoration-none text-10 text-burger bg-#264ed2 w-500px"
        >
          Panda fest
        </a>

        <a
          v-if="isOpen"
          href="/side2"
          :style="{ 'transition-delay': isOpen ? '0.5s' : '0s' }"
          class="burger__item p-20 decoration-none text-10 text-burger bg-#395cd0 w-400px"
        >
          Todo liste
        </a>

        <a
          v-if="isOpen"
          href="/side3"
          :style="{ 'transition-delay': isOpen ? '0.6s' : '0s' }"
          class="burger__item p-20 decoration-none text-10 text-burger bg-#5a76d1 w-300px"
        >
          Halløj
        </a>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped>
.burger__bar {
  transition: 0.5s;
}
´ .burger__menu {
  transform: translateX(-100%);
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

.burger__item {
  font-family: Arial, Helvetica, sans-serif;
  transform: translateX(-100%);
}

.burger-enter-active,
.burger-leave-active {
  transition: all 0.2s ease-in-out;
}
.burger-enter-from,
.burger-leave-to {
  transform: translateX(0);
}
</style>
