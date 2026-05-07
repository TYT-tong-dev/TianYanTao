<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['open-gallery'])

const cover = computed(() => props.project.cover || props.project.screenshots[0])
const coverLoadFailed = ref(false)
const galleryCta = computed(() =>
  props.project.screenshots.length > 1 ? '查看完整项目图集' : '查看项目预览',
)

const openGalleryAt = (index) => {
  emit('open-gallery', {
    title: props.project.title,
    subtitle: props.project.role,
    items: props.project.screenshots,
    index,
  })
}

const onCoverError = () => {
  coverLoadFailed.value = true
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

      <p v-if="project.previewNote" class="project-card__note">
        {{ project.previewNote }}
      </p>

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
        <img
          v-if="!coverLoadFailed"
          :src="cover.src"
          :alt="cover.alt || project.title"
          loading="lazy"
          decoding="async"
          @error="onCoverError"
        />
        <div v-else class="project-card__cover-fallback">
          <strong>{{ project.title }}</strong>
          <span>图片加载失败，点击查看详情</span>
        </div>
        <span>{{ cover.title || '项目封面' }}</span>
      </button>

      <div class="project-card__preview-meta">
        <span>{{ project.screenshots.length }} 张项目图片</span>
        <span v-if="project.visibility">{{ project.visibility }}</span>
      </div>

      <button class="project-card__more" type="button" @click="openGalleryAt(0)">
        {{ galleryCta }}
      </button>
    </div>
  </article>
</template>
