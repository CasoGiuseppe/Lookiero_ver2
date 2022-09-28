<template>
  <section class="twitter-layout">
    <aside class="twitter-layout__users">
      <template v-for="(item, key) in twitterUsers" :key="key">
        <AnimatedList :rows="item">
          <template #title>{{ key }}</template>
          <template #rows="{ row: { id, author, following } }">
            <UserDetail>
              <template #author>{{ author }}</template>
              <template #action>
                <BaseButton :id="id" :mode="following ? 'secondary' : null" @handleClick="updateUser">
                  {{ following ? "unfollow" : "follow" }}
                </BaseButton>
              </template>
            </UserDetail>
          </template>
        </AnimatedList>
      </template>
    </aside>
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

// ui
import AnimatedList from "@/app/ui/views/animated-list/AnimatedList.vue";
import UserDetail from "@/app/ui/components/user-detail/UserDetail.vue";
import BaseButton from "@/app/ui/components/base/base-button/BaseButton.vue";

// composables
import { useChangeUserFollower } from "@/app/composables/follower.composable";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { GET_TIMELINE_LIST, GET_USERS } from "@/domains/twitter/infrastructure/store/getters.js";

// pinia
const twitterStore = useTwitterStore();
const twitterList = computed(() => twitterStore[GET_TIMELINE_LIST]);
const twitterUsers = computed(() => {
  return {
    follow: twitterStore[GET_USERS]?.filter((node) => node.following === false),
    following: twitterStore[GET_USERS]?.filter((node) => node.following === true),
  };
});

const updateUser = (id) => useChangeUserFollower(id);
</script>
<style lang="scss" src="./TwitterLayout.scss" />
