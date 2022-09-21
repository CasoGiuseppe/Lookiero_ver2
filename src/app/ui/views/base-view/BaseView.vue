<template>
  <section>base view</section>
</template>

<script setup>
// constants
import { API_NAMESPACE, API_ENDPOINT } from "@/assets/partials/constants";

// usecases
import { UseGetTwitterUsers } from "@/domains/twitter/core";
import { onMounted } from "vue";
onMounted(async () => {
  console.log(await UseGetTwitterUsers({ url: `${API_NAMESPACE}${API_ENDPOINT}` }));
});
</script>
