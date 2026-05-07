<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['open-gallery'])

const cover = computed(() => props.project.screenshots[0])
const previewShots = computed(() => props.project.screenshots.slice(1, 5))

const openGalleryAt = (index) => {
  emit('open-gallery', {
    title: props.project.title,
    subtitle: props.project.role,
    items: props.project.screenshots,
    index,
  })
}
</script>

<template>
  <article class="project-card">
    <div class="project-card__copy">
      <div class="project-card__meta">
        <span class="project-card__role">{{ project.role }}</span>
        <span v-if="project.period" class="project-card__period">{{ project.period }}</span>
      </div>

      <h3>{{ project.title }}</h3>
      <p class="project-card__summary">{{ project.summary }}</p>

      <ul class="project-card__bullets">
        <li v-for="bullet in project.bullets" :key="bullet">
          {{ bullet }}
        </li>
      </ul>

      <div class="project-card__stack">
        <span v-for="tech in project.techStack" :key="tech">{{ tech }}</span>
      </div>

      <div class="project-card__links">
        <a
          v-for="link in project.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noreferrer"
        >
          {{ link.label }}
        </a>
      </div>
    </div>

    <div class="project-card__media">
      <button class="project-card__cover" type="button" @click="openGalleryAt(0)">
        <img :src="cover.src" :alt="cover.alt || project.title" loading="lazy" />
        <span>{{ cover.title || '项目封面' }}</span>
      </button>

      <div class="project-card__gallery">
        <button
          v-for="(shot, index) in previewShots"
          :key="shot.src"
          type="button"
          class="project-card__shot"
          @click="openGalleryAt(index + 1)"
        >
          <img :src="shot.src" :alt="shot.alt || shot.title" loading="lazy" />
        </button>
      </div>

      <button
        v-if="project.screenshots.length > 1"
        class="project-card__more"
        type="button"
        @click="openGalleryAt(0)"
      >
        查看更多图片
      </button>
    </div>
  </article>
</template>
