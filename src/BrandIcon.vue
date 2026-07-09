<script setup lang="ts">
defineProps<{
  icon: {
    title: string;
    path: string;
  };
  size?: number;
}>();
</script>

<template>
  <svg
    class="brand-icon"
    :width="size ?? 18"
    :height="size ?? 18"
    viewBox="0 0 24 24"
    role="img"
    :aria-label="icon.title"
  >
    <path :d="icon.path" fill="currentColor" />
  </svg>
</template>
