<template>
  <footer class="message-box">
    <form class="message-box__input">
      <textarea rows="5" v-model="form.message" />
      <BaseButton mode="secondary" :disabled="minAllowedCharacter">send</BaseButton>
    </form>
  </footer>
</template>

<script setup>
import { reactive, computed } from "vue";

// constants
import { MIN_CHARACTER_ALLOWED } from "@/app/partials/constants";

// ui
import BaseButton from "@/app/ui/components/base/base-button/BaseButton.vue";

const form = reactive({ message: "" });
const minAllowedCharacter = computed(() => form.message.length < MIN_CHARACTER_ALLOWED);
</script>
<style lang="scss" src="./MessageBox.scss" />
