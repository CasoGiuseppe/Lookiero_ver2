<template>
  <footer class="message-box">
    <form class="message-box__input" onsubmit="return false">
      <textarea rows="5" v-model="form.message" />
      <BaseButton mode="secondary" :disabled="minAllowedCharacter" @handleClick="saveNewMessage">send</BaseButton>
    </form>
  </footer>
</template>

<script setup>
import { reactive, computed } from "vue";

// constants
import { MIN_CHARACTER_ALLOWED } from "@/app/partials/constants";

// ui
import BaseButton from "@/app/ui/components/base/base-button/BaseButton.vue";

// usecase
import { UseAddMessage } from "@/domains/twitter/core";

const form = reactive({ message: "" });
const minAllowedCharacter = computed(() => form.message.length < MIN_CHARACTER_ALLOWED);
const saveNewMessage = () => UseAddMessage();
</script>
<style lang="scss" src="./MessageBox.scss" />
