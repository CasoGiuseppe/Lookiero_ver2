<template>
  <section class="animated-list">
    <h2 v-if="$slots['title']" class="animated-list__title">
      <slot name="title" />
    </h2>
    <transition-group appear tag="ul" name="appear-list-item" class="animated-list__table">
      <li
        v-for="(row, index) in rows"
        :key="row"
        :style="{
          transitionDelay: `${index * 0.1}s`,
        }"
        class="animated-list__row"
      >
        <slot :row="row" name="rows" />
      </li>
    </transition-group>
  </section>
</template>
<script setup>
defineProps({
  rows: {
    type: Array,
    default: () => [],
    required: true,
  },
});
</script>
<style lang="scss" src="./AnimatedList.scss" />
