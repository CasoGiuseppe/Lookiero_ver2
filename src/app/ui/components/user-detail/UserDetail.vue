<template>
  <article :class="[isNew ? 'user-detail--is-new' : null, 'user-detail']">
    <h3 v-if="$slots['author']" class="user-detail__author">
      <slot name="author" />
    </h3>
    <span v-if="$slots['time']" class="user-detail__time">
      <slot name="time" />
    </span>
    <slot name="action" />
    <p v-if="$slots['message']" class="user-detail__message">
      <slot name="message" />
    </p>
  </article>
</template>
<script setup>
defineProps({
  isNew: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" src="./UserDetail.scss" />
