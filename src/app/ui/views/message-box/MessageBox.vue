<template>
  <footer class="message-box">
    <form class="message-box__input">
      <textarea rows="5" />
      <BaseButton mode="secondary">send</BaseButton>
    </form>
  </footer>
</template>

<script setup>
// ui
import BaseButton from "@/app/ui/components/base/base-button/BaseButton.vue";
</script>
<style lang="scss" src="./MessageBox.scss" />
