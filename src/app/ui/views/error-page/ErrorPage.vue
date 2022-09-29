<template>
  <section class="error">
    <h2 class="error-message">{{ GENERIC_ERROR }}</h2>
    <BaseButton @handleClick="goToHome">{{ GO_HOME }}</BaseButton>
  </section>
</template>
<script setup>
// router
import router from "@/app/router";

// constants
import { GENERIC_ERROR, GO_HOME } from "@/app/partials/messages";

// ui
import BaseButton from "@/app/ui/components/base/base-button/BaseButton.vue";

const goToHome = () => router.push({ name: "home" });
</script>
<style lang="scss" src="./ErrorPage.scss" />
