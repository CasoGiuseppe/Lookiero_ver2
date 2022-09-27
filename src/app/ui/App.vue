<template>
  <section :class="[loaderStore.state === true ? 'is-loading is-blocked' : null, 'root-layout']">
    <section class="root-layout__content">
      {{ notificationHeight }}
      <RouterView />
    </section>
  </section>

  <!-- notification module-->
  <transition-group appear mode="out-in" name="appear-notify" @after-enter="endEnterEvent">
    <Notification
      v-for="(notification, index) in notificationStore"
      :key="`${notification.type}-${notification.message.replace(/\s/g, '')}`"
      @close="closeNotification"
      :state="notification.state"
      :type="notification.type"
      :uuid="notification.uuid"
      :style="{
        top: `${index * notificationHeight}px`,
      }"
    >
      <template #message> {{ notification.message }} </template>
    </Notification>
  </transition-group>
</template>
<script setup>
import { RouterView } from "vue-router";
import { computed, ref } from "vue";
// components
import Notification from "@/app/ui/components/base/base-notification/BaseNotification.vue";

// store
import { useCosmeticStore } from "@/app/stores/cosmetic";
import { GET_LOADER_STATE, GET_NOTIFICATION_MODE } from "@/app/stores/cosmetic/getters";
import { REMOVE_NOTIFICATION } from "@/app/stores/cosmetic/actions";
import { storeToRefs } from "pinia";

// cosmetic pina
const cosmeticStore = useCosmeticStore();
const cosmeticRefs = storeToRefs(cosmeticStore);
const loaderStore = cosmeticRefs[GET_LOADER_STATE].value;
const notificationStore = computed(() => cosmeticStore[GET_NOTIFICATION_MODE]);

// notification handle
const notificationHeight = ref(10);
const closeNotification = ({ uuid }) => cosmeticStore[REMOVE_NOTIFICATION]({ uuid });
const endEnterEvent = (e) => (notificationHeight.value = e.clientHeight + 10);
</script>
<style lang="scss" src="@/assets/styles/index.scss" />
