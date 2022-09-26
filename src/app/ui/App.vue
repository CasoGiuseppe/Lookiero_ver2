<template>
  <section :class="[loaderStore.state === true ? 'is-loading is-blocked' : null, 'root-layout']">
    <section class="root-layout__content">
      <RouterView />
    </section>
  </section>

  <!-- notification module-->
  <transition mode="out-in" name="appear-notify">
    <Notification
      v-if="notificationStore.state"
      @close="closeNotification"
      :state="notificationStore.state"
      :type="notificationStore.type"
    >
      <template #message> {{ notificationStore.message }} </template>
    </Notification>
  </transition>
</template>
<script setup>
import { RouterView } from "vue-router";

// components
import Notification from "@/app/ui/components/base/base-notification/BaseNotification.vue";

// store
import { useCosmeticStore } from "@/app/stores/cosmetic";
import { GET_LOADER_STATE, GET_NOTIFICATION_MODE } from "@/app/stores/cosmetic/getters";
import { storeToRefs } from "pinia";

// usecase
import { UseNotifications } from "@/domains/twitter/core";

// cosmetic pina
const cosmeticStore = useCosmeticStore();
const cosmeticRefs = storeToRefs(cosmeticStore);
const loaderStore = cosmeticRefs[GET_LOADER_STATE].value;
const notificationStore = cosmeticRefs[GET_NOTIFICATION_MODE].value;

const { onNotificationMessage } = UseNotifications();

// actions
const closeNotification = () => onNotificationMessage({});
</script>
<style lang="scss" src="@/assets/styles/index.scss" />
