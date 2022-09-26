<template>
  <section>base view</section>
</template>

<script setup>
// constants
import { API_BASE_PATH } from "@/assets/partials/constants";
import { GENERIC_ERROR, API_SUCCESS } from "@/app/partials/messages";

// usecases
import { UseGetUsers } from "@/domains/twitter/core";
import { onMounted } from "vue";
onMounted(async () => {
  await UseGetUsers({
    request: {
      url: `${API_BASE_PATH}owner/false`,
    },
    onErrorState: {
      state: true,
      type: "error",
      message: GENERIC_ERROR,
    },
    onInfoState: {
      state: true,
      type: "info",
      message: API_SUCCESS,
    },
  });
  // console.log(await UseGetUsersByValue({ request: { url: `${API_BASE_PATH}` } }));
  // console.log(await UseGetUsersByValue({ request: { url: `${API_BASE_PATH}id/2` } }));
  //await UseChangeUserState({ request: { url: `${API_BASE_PATH}id/2`, value: true } });
  //await UseAddUserMessage({ request: { url: `${API_BASE_PATH}id/2`, value: { date: "now", message: "new messa" } } });
  //console.log(await UseGetUsersByValue({ request: { url: `${API_BASE_PATH}id/2` } }));
});
</script>
