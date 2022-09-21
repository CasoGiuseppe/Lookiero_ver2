<template>
  <section>base view</section>
</template>

<script setup>
import { UseGetAllUsers } from "@/domains/twitter/core";
import { onMounted } from "vue";
onMounted(async () => {
  console.log(UseGetAllUsers());
});
</script>
