<template>
  <article class="post-preview mb-4 p-4 border rounded">
    <time :datetime="post.date" class="text-muted small d-block mb-2">
      {{ formatDate(post.date) }}
    </time>
    <h3 class="title mb-3">
      <RouterLink :to="`/posts/${post.slug}`" class="text-decoration-none">
        {{ post.title }}
      </RouterLink>
    </h3>
    <div class="post-content summary">
      {{ post.summary }}
      <div class="mt-2">
        <RouterLink :to="`/posts/${post.slug}`" class="text-decoration-none">
          Read More…
        </RouterLink>
      </div>
    </div>
    <div v-if="post.tags && post.tags.length" class="tags mt-3">
      <span v-for="tag in post.tags" :key="tag" class="badge bg-secondary me-2">
        {{ tag }}
      </span>
    </div>
  </article>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'PostPreview',
  components: {
    RouterLink
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.post-preview {
  transition: box-shadow 0.3s ease;
}

.post-preview:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.title a {
  color: #212529;
}

.title a:hover {
  color: #0d6efd;
}
</style>

