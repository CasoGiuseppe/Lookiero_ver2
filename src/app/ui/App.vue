<template>
  <section :class="[loaderStore.state === true ? 'is-loading is-blocked' : null, 'root-layout']">
    <section class="root-layout__content">
      <RouterView />
    </section>
  </section>
</template>

<script setup>
import { RouterView } from "vue-router";

// store
import { useCosmeticStore } from "@/app/stores/cosmetic";
import { GET_LOADER_STATE } from "@/app/stores/cosmetic/getters";
import { storeToRefs } from "pinia";

// cosmetic pina
const cosmeticStore = useCosmeticStore();
const cosmeticRefs = storeToRefs(cosmeticStore);
const loaderStore = cosmeticRefs[GET_LOADER_STATE].value;
</script>
<style lang="scss" src="@/assets/styles/index.scss" />
