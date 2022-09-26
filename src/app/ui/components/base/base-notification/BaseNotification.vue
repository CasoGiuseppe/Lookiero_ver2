<template>
  <aside
    :class="[
      'base-notification',
      type ? `base-notification--is-${type}` : null,
    ]"
    ref="dialog"
  >
    <button class="base-notification__close" @click="closeModal" />
    <slot name="message" />
  </aside>
</template>
<script setup>
const prop = defineProps({
  type: {
    type: String,
    default: null,
    validator: (type) => ['error', 'info'].includes(type),
  },
});

const emit = defineEmits(['close']);

// method to close dialog an launch emit to do action
const closeModal = () => emit('close');
</script>
<style lang="scss" src="./BaseNotification.scss" />
