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
import { TIMELINE_UPDATE_SUCCESS } from "@/app/partials/messages";

// ui
import BaseButton from "@/app/ui/components/base/base-button/BaseButton.vue";

// composables
import { useMessage } from "@/app/composables/message.composable";
import { useTimeline } from "@/app/composables/timeline.composable";

const form = reactive({ message: "" });
const minAllowedCharacter = computed(() => form.message.length < MIN_CHARACTER_ALLOWED);
const saveNewMessage = () =>
  useMessage({
    callbacks: [() => useTimeline({ message: TIMELINE_UPDATE_SUCCESS() })],
    payload: { date: new Date(), text: form.message },
  });
</script>
<style lang="scss" src="./MessageBox.scss" />
