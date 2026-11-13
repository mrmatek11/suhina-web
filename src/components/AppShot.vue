<script setup lang="ts">
withDefaults(defineProps<{ name: string; alt: string; sizes?: string; width?: number; height?: number; eager?: boolean }>(),
  { sizes: '(min-width: 1320px) 1280px, 100vw', width: 1280, height: 800 })
const base = `${import.meta.env.BASE_URL}assets/product/`
</script>

<template>
  <img :src="`${base}${name}.webp`" :srcset="`${base}${name}-720.webp 720w, ${base}${name}.webp ${width}w`" :sizes="sizes" :alt="alt"
    :width="width" :height="height" :loading="eager ? undefined : 'lazy'" :fetchpriority="eager ? 'high' : undefined" decoding="async">
</template>

<style scoped>
img { display: block; width: 100%; height: auto; }
</style>
