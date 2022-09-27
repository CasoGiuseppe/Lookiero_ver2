<template>
  <transition-group appear class="animated-list" tag="ul" name="appear-teams-item">
    <li v-for="row in rows" :key="value">
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
