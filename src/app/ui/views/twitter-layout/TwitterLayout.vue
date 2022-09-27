<template>
  <section class="twitter-layout">
    <aside class="twitter-layout__users">users</aside>
    <section class="twitter-layout__timeline">
      <AnimatedList :rows="twitterList">
        <template #rows="{ row: { author, diffTime: time, message } }">
          {{ author }}, {{ time }}, {{ message }}
        </template>
      </AnimatedList>
    </section>
  </section>
</template>
<script setup>
import { computed } from "vue";

// components
import AnimatedList from "@/app/ui/views/animated-list/AnimatedList.vue";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { GET_TIMELINE_LIST } from "@/domains/twitter/infrastructure/store/getters.js";

// pinia
const twitterStore = useTwitterStore();
const twitterList = computed(() => twitterStore[GET_TIMELINE_LIST]);
</script>
<style lang="scss" src="./TwitterLayout.scss" />
