<template>
  <transition-group appear class="animated-list" tag="ul" name="appear-teams-item">
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
