<template>
  <section class="animated-list">
    <h2 v-if="$slots['title']" class="animated-list__title">
      <slot name="title" />
    </h2>
    <transition-group appear tag="ul" name="appear-list-item" class="animated-list__table" @after-enter="endEnterEvent">
      <li
        v-for="(row, index) in rows"
        :key="row.id"
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

const endEnterEvent = async (e) => {
  e.style.removeProperty("transition-delay");
};
</script>
<style lang="scss" src="./AnimatedList.scss" />
