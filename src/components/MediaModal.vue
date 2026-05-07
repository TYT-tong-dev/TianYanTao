<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: () => [],
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['close', 'next', 'prev', 'select'])

const currentItem = computed(() => props.items[props.activeIndex] ?? {})

const onKeydown = (event) => {
  if (!props.open) return
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowRight') emit('next')
  if (event.key === 'ArrowLeft') emit('prev')
}

watch(
  () => props.open,
  (value) => {
    if (value) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeydown)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="media-modal" @click.self="$emit('close')">
      <div class="media-modal__shell">
        <button class="media-modal__close" type="button" @click="$emit('close')">
          ×
        </button>

        <div class="media-modal__header">
          <div>
            <p>{{ subtitle || title }}</p>
            <h3>{{ currentItem.title || title }}</h3>
          </div>
          <span>{{ activeIndex + 1 }} / {{ items.length }}</span>
        </div>

        <div class="media-modal__stage">
          <button
            v-if="items.length > 1"
            class="media-modal__nav media-modal__nav--prev"
            type="button"
            @click="$emit('prev')"
          >
            ‹
          </button>

          <img
            :src="currentItem.src"
            :alt="currentItem.alt || currentItem.title || title"
            class="media-modal__image"
          />

          <button
            v-if="items.length > 1"
            class="media-modal__nav media-modal__nav--next"
            type="button"
            @click="$emit('next')"
          >
            ›
          </button>
        </div>

        <p v-if="currentItem.description" class="media-modal__caption">
          {{ currentItem.description }}
        </p>

        <div v-if="items.length > 1" class="media-modal__thumbs">
          <button
            v-for="(item, index) in items"
            :key="`${item.src}-${index}`"
            type="button"
            class="media-modal__thumb"
            :class="{ 'is-active': activeIndex === index }"
            @click="$emit('select', index)"
          >
            <img :src="item.src" :alt="item.alt || item.title" loading="lazy" />
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

