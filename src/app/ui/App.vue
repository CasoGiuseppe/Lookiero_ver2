<template>
  <section :class="[loaderStore.state === true ? 'is-loading is-blocked' : null, 'root-layout']">
    <section class="root-layout__content">
      <RouterView />
      <RouterView name="footer" />
    </section>
  </section>

  <!-- notification module-->
  <transition-group appear mode="out-in" name="appear-notify" @enter="startEnterEvent" @after-enter="endEnterEvent">
    <Notification
      v-for="(notification, index) in notificationStore"
      :key="`${notification.type}-${notification.message.replace(/\s/g, '')}`"
      @close="closeNotification"
      :state="notification.state"
      :type="notification.type"
      :uuid="notification.uuid"
      :data-index="index"
      :data-uuid="notification.uuid"
      :style="{
        top: `${notificationHeight.values[index] || 0}px`,
        'transition-delay': `${index * 0.1}s`,
      }"
    >
      <template #message> {{ notification.message }} </template>
    </Notification>
  </transition-group>
</template>
<script setup>
import { RouterView } from "vue-router";
import { computed, reactive } from "vue";

// ui
import Notification from "@/app/ui/components/base/base-notification/BaseNotification.vue";

// constants
import { API_DELAY_MAX } from "@/app/partials/constants";

// store
import { useCosmeticStore } from "@/app/stores/cosmetic";
import { GET_LOADER_STATE, GET_NOTIFICATION_MODE } from "@/app/stores/cosmetic/getters";
import { REMOVE_NOTIFICATION } from "@/app/stores/cosmetic/actions";
import { storeToRefs } from "pinia";

// helper
import { wait } from "@/app/partials/helpers";

// cosmetic pina
const cosmeticStore = useCosmeticStore();
const cosmeticRefs = storeToRefs(cosmeticStore);
const loaderStore = cosmeticRefs[GET_LOADER_STATE].value;
const notificationStore = computed(() => cosmeticStore[GET_NOTIFICATION_MODE]);

// notification handle
const notificationHeight = reactive({ values: {} });
const closeNotification = ({ uuid }) => cosmeticStore[REMOVE_NOTIFICATION]({ uuid });
const startEnterEvent = (e) =>
  (notificationHeight.values = {
    ...notificationHeight.values,
    ...{ [e.dataset.index]: (e.clientHeight + 10) * e.dataset.index },
  });

const endEnterEvent = async (e) => {
  await wait(API_DELAY_MAX);
  cosmeticStore[REMOVE_NOTIFICATION]({ uuid: e.dataset.uuid });
};
</script>
<style lang="scss" src="@/assets/styles/index.scss" />
