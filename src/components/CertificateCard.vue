<script setup>
defineProps({
  certificate: {
    type: Object,
    required: true,
  },
})

defineEmits(['preview'])
</script>

<template>
  <article class="certificate-card">
    <button
      v-if="certificate.thumbnail"
      type="button"
      class="certificate-card__thumb"
      @click="$emit('preview', certificate)"
    >
      <img
        :src="certificate.thumbnail"
        :alt="certificate.title"
        loading="lazy"
      />
    </button>
    <div v-else class="certificate-card__thumb certificate-card__thumb--pdf">
      <span>PDF</span>
    </div>

    <div class="certificate-card__body">
      <p class="certificate-card__category">{{ certificate.category }}</p>
      <h3>{{ certificate.title }}</h3>
      <p v-if="certificate.note">{{ certificate.note }}</p>

      <div class="certificate-card__actions">
        <button
          v-if="certificate.thumbnail"
          type="button"
          @click="$emit('preview', certificate)"
        >
          放大查看
        </button>
        <a :href="certificate.sourceUrl" target="_blank" rel="noreferrer">
          查看原件
        </a>
      </div>
    </div>
  </article>
</template>

