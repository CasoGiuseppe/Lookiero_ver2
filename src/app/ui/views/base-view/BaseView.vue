<template>
  <section>base view</section>
</template>

<script setup>
// constants
import { API_NAMESPACE, API_ENDPOINT } from "@/assets/partials/constants";

// usecases
import { UseGetUsersByValue, UseChangeUserState } from "@/domains/twitter/core";
import { onMounted } from "vue";
onMounted(async () => {
  // console.log(await UseGetTwitterUsers({ request: { url: `${API_NAMESPACE}${API_ENDPOINT}` } }));
  // console.log(await UseGetTwitterUsers({ request: { url: `${API_NAMESPACE}${API_ENDPOINT}id/2` } }));
  console.log(await UseGetUsersByValue({ request: { url: `${API_NAMESPACE}${API_ENDPOINT}id/2` } }));
  console.log(await UseChangeUserState({ request: { url: `${API_NAMESPACE}${API_ENDPOINT}id/2`, value: true } }));
});
</script>
