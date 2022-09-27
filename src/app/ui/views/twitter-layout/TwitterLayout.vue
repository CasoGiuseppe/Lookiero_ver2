<template>
  <section class="twitter-layout">
    <aside class="twitter-layout__users">users</aside>
    <section class="twitter-layout__timeline">
      <AnimatedList :rows="twitterList">
        <template #title>Timeline</template>
        <template #rows="{ row: { author, diffTime: time, message } }">
          <UserDetail>
            <template #author
              ><strong>{{ author }}</strong></template
            >
            <template #time>{{ time }}</template>
            <template #message>{{ message }}</template>
          </UserDetail>
        </template>
      </AnimatedList>
    </section>
  </section>
</template>
<script setup>
import { computed } from "vue";

// components
import AnimatedList from "@/app/ui/views/animated-list/AnimatedList.vue";
import UserDetail from "@/app/ui/components/user-detail/UserDetail.vue";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { GET_TIMELINE_LIST } from "@/domains/twitter/infrastructure/store/getters.js";

// pinia
const twitterStore = useTwitterStore();
const twitterList = computed(() => twitterStore[GET_TIMELINE_LIST]);
</script>
<style lang="scss" src="./TwitterLayout.scss" />
