<template>
  <aside :class="['base-notification', type ? `base-notification--is-${type}` : null]" ref="dialog">
    <button class="base-notification__close" @click="closeModal" />
    <slot name="message" />
  </aside>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: null,
    validator: (type) => ["error", "info"].includes(type),
  },
  uuid: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["close"]);

// method to close dialog an launch emit to do action
const closeModal = () => emit("close", { uuid: props.uuid });
</script>
<style lang="scss" src="./BaseNotification.scss" />
