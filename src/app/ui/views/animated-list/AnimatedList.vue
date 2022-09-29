<template>
  <section class="animated-list">
    <h2 v-if="$slots['title']" class="animated-list__title">
      <slot name="title" />
    </h2>
    <transition-group appear tag="ul" name="appear-list-item" class="animated-list__table">
      <li v-for="row in rows" :key="complex ? `${row.name}` : row.id" class="animated-list__row">
        <slot :row="row" name="rows" />
      </li>
    </transition-group>
    <li v-if="$slots['error']" class="animated-list__error">
      <slot name="error" />
    </li>
  </section>
</template>
<script setup>
defineProps({
  rows: {
    type: Array,
    default: () => [],
    required: true,
  },

  complex: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" src="./AnimatedList.scss" />
