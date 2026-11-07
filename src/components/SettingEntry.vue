<script setup lang="ts">
import { ref } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { pageLabel } from '../data/settings'
import type { Setting } from '../data/settings'

defineProps<{ setting: Setting }>()
const open = ref(false)
const reducedMotion = useReducedMotion()
// The build's prerender writes every explanation into the closed entry so that it is part of the
// published page; in the browser it renders when the entry opens, with its entrance animation.
const prerendering = import.meta.env.SSR
function toggle(event: Event) {
  if (event.target instanceof HTMLDetailsElement) open.value = event.target.open
}
</script>

<template>
  <details class="setting" @toggle="toggle">
    <summary>
      <div><span class="setting-title"><span class="setting-name">{{ setting.name }}</span><span v-if="setting.workInProgress" class="progress-pill">Work in progress</span></span><span class="setting-path">{{ pageLabel(setting.page) }} / {{ setting.section }}</span></div>
      <span class="setting-note">{{ setting.note }}</span>
      <span class="setting-plus" aria-hidden="true">+</span>
    </summary>
    <motion.div v-if="open || prerendering" class="setting-body"
      :initial="{ opacity: reducedMotion || prerendering ? 1 : 0, y: reducedMotion || prerendering ? 0 : -4 }"
      :animate="{ opacity: 1, y: 0 }" :transition="{ duration: reducedMotion ? 0 : 0.18 }">
      <p>Find it in <strong>Options → Settings → {{ pageLabel(setting.page) }} → {{ setting.section }}</strong>.</p>
      <p v-if="setting.description">{{ setting.description }}</p>
      <dl v-if="setting.options.length">
        <template v-for="option in setting.options" :key="option.name">
          <dt><strong>{{ option.name }}</strong></dt><dd>{{ option.description }}</dd>
        </template>
      </dl>
      <p v-if="setting.whenToChange"><strong>When to change it:</strong> {{ setting.whenToChange }}</p>
      <p v-if="setting.keys.length">Saved setting: <code v-for="key in setting.keys" :key="key">{{ key }}</code></p>
    </motion.div>
  </details>
</template>

<style scoped>
.setting-title { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px; }
.progress-pill { display: inline-block; padding: 3px 8px; border-radius: 999px; background: var(--orange); color: var(--on-orange); font: 9px/1.4 var(--mono); white-space: nowrap; }
dd { margin: 3px 0 12px 18px; }
code + code { margin-left: 5px; }
</style>
