<template>
  <section class="twitter-layout">
    <aside class="twitter-layout__users">
      <template v-for="(item, key) in twitterUsers" :key="key">
        <AnimatedList :rows="item">
          <template #title>{{ key }}</template>
          <template #rows="{ row: { id, author, following } }">
            <UserDetail>
              <template #author>
                <button
                  :data-selected="twitterSelectedUser.id === id ? true : null"
                  @click="setCurrentTimeline({ id, author })"
                >
                  {{ author }}
                </button>
              </template>
              <template #action>
                <BaseButton
                  :id="id"
                  :state="following"
                  :mode="following ? 'secondary' : null"
                  @handleClick="updateUser"
                >
                  {{ following ? "unfollow" : "follow" }}
                </BaseButton>
              </template>
            </UserDetail>
          </template>
          <template #error v-if="item.length === 0">No users founded</template>
        </AnimatedList>
      </template>
    </aside>
    <section class="twitter-layout__timeline">
      <AnimatedList :rows="twitterList" complex>
        <template #title>{{ twitterSelectedUser.author }} Timeline</template>
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
import { computed, watch } from "vue";
import { API_BASE_PATH } from "@/app/partials/constants";
import { TIMELINE_UPDATE_SUCCESS } from "@/app/partials/messages";

// ui
import AnimatedList from "@/app/ui/views/animated-list/AnimatedList.vue";
import UserDetail from "@/app/ui/components/user-detail/UserDetail.vue";
import BaseButton from "@/app/ui/components/base/base-button/BaseButton.vue";

// composables
import { useChangeUserFollower, useUsersFollower } from "@/app/composables/users.composable";
import { useTimeline } from "@/app/composables/timeline.composable";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { GET_TIMELINE_LIST, GET_USERS, GET_SELECTED_USER } from "@/domains/twitter/infrastructure/store/getters";
import { CHANGE_SELECTED_USER } from "@/domains/twitter/infrastructure/store/actions";

// pinia
const twitterStore = useTwitterStore();
const twitterList = computed(() => twitterStore[GET_TIMELINE_LIST]);
const twitterUsers = computed(() => {
  return {
    follow: twitterStore[GET_USERS]?.filter((node) => node.following === false).sort(),
    following: twitterStore[GET_USERS]?.filter((node) => node.following === true).sort(),
  };
});
const twitterSelectedUser = computed(() => twitterStore[GET_SELECTED_USER]);

const updateUser = async ({ state, id }) =>
  useChangeUserFollower({ state, id, callbacks: [useUsersFollower, useTimeline] });
const setCurrentTimeline = async ({ id, author }) =>
  twitterStore[CHANGE_SELECTED_USER]({ user: twitterSelectedUser.value.id !== id ? { id, author } : {} });

watch(twitterSelectedUser, async ({ id }) => {
  await useTimeline(
    id ? { urls: [`${API_BASE_PATH}id/${id}`], message: TIMELINE_UPDATE_SUCCESS(twitterSelectedUser.value.author) } : {}
  );
});
</script>
<style lang="scss" src="./TwitterLayout.scss" />
