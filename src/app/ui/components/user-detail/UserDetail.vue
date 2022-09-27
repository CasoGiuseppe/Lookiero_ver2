<template>
  <article class="user-detail">
    <h3 v-if="$slots['author']" class="user-detail__author">
      <slot name="author" />
    </h3>
    <span v-if="$slots['time']" class="user-detail__time">
      <slot name="time" />
    </span>
    <p v-if="$slots['message']" class="user-detail__message">
      <slot name="message" />
    </p>
  </article>
</template>
<style lang="scss" src="./UserDetail.scss" />
