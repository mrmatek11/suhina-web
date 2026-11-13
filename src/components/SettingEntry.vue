<script setup lang="ts">
import { ref } from 'vue'
import { pageLabel } from '../data/settings'
import type { Setting } from '../data/settings'

defineProps<{ setting: Setting }>()
const open = ref(false)
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
      <div><span class="setting-name">{{ setting.name }}</span><span class="setting-path">{{ pageLabel(setting.page) }} / {{ setting.section }}<template v-if="setting.workInProgress">. Work in progress.</template></span></div>
      <span class="setting-note">{{ setting.note }}</span>
      <span class="setting-plus" aria-hidden="true">+</span>
    </summary>
    <div v-if="open || prerendering" class="setting-body">
      <p>Find it in <strong>Options → Settings → {{ pageLabel(setting.page) }} → {{ setting.section }}</strong>.</p>
      <p v-if="setting.description">{{ setting.description }}</p>
      <dl v-if="setting.options.length">
        <template v-for="option in setting.options" :key="option.name">
          <dt><strong>{{ option.name }}</strong></dt><dd>{{ option.description }}</dd>
        </template>
      </dl>
      <p v-if="setting.whenToChange"><strong>When to change it:</strong> {{ setting.whenToChange }}</p>
      <p v-if="setting.keys.length">Saved setting: <code v-for="key in setting.keys" :key="key">{{ key }}</code></p>
    </div>
  </details>
</template>

<style scoped>
dl { margin: 0 0 1em; }
dd { margin: 2px 0 12px 18px; }
code + code { margin-left: 8px; }
</style>
