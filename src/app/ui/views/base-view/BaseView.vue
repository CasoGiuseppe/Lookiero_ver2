<template>
  <section>base view</section>
</template>

<script setup>
// constants
import { API_BASE_PATH } from "@/assets/partials/constants";
import { GENERIC_ERROR, API_SUCCESS, BASE_NOTIFICATION_OBJ as notification } from "@/app/partials/messages";

// usecases
import { UseGetTimelineMessages } from "@/domains/twitter/core";
import { onMounted } from "vue";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { CHANGE_USERS_LIST } from "@/domains/twitter/infrastructure/store/actions";

onMounted(async () => {
  // pinia
  const twitterStore = useTwitterStore();

  await UseGetTimelineMessages({
    request: {
      url: `${API_BASE_PATH}following/true`,
    },
    onErrorState: notification({ type: "error", message: GENERIC_ERROR }),
    onInfoState: notification({ type: "info", message: API_SUCCESS }),
    $store: twitterStore,
    $actionName: CHANGE_USERS_LIST,
  });
  // console.log(await UseGetUsersByValue({ request: { url: `${API_BASE_PATH}` } }));
  // console.log(await UseGetUsersByValue({ request: { url: `${API_BASE_PATH}id/2` } }));
  //await UseChangeUserState({ request: { url: `${API_BASE_PATH}id/2`, value: true } });
  //await UseAddUserMessage({ request: { url: `${API_BASE_PATH}id/2`, value: { date: "now", message: "new messa" } } });
  //console.log(await UseGetUsersByValue({ request: { url: `${API_BASE_PATH}id/2` } }));
});
</script>
