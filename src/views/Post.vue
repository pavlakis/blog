<template>
  <div class="post">
    <article v-if="post" class="content">
      <h1 class="mb-3">{{ post.title }}</h1>
      <time :datetime="post.date" class="text-muted small d-block mb-4">
        {{ formatDate(post.date) }}
      </time>
      <div v-if="post.tags && post.tags.length" class="tags mb-4">
        <span v-for="tag in post.tags" :key="tag" class="badge bg-secondary me-2">
          {{ tag }}
        </span>
      </div>
      <div class="post-content" v-html="post.content"></div>
    </article>
    <div v-else class="alert alert-warning">
      Post not found
    </div>
    <div class="mt-4">
      <RouterLink to="/" class="btn btn-outline-primary">
        ← Back to Home
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { posts } from '../data/posts'

export default {
  name: 'Post',
  components: {
    RouterLink
  },
  setup() {
    const route = useRoute()
    const post = ref(null)

    onMounted(() => {
      const slug = route.params.slug
      post.value = posts.find(p => p.slug === slug)
    })

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    return {
      post,
      formatDate
    }
  }
}
</script>

<style scoped>
.post {
  max-width: 800px;
  margin: 0 auto;
}

.post-content {
  line-height: 1.8;
}

.post-content :deep(pre) {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
}

.post-content :deep(code) {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.post-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.post-content :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.post-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
}

.post-content :deep(a) {
  color: #0d6efd;
  text-decoration: none;
}

.post-content :deep(a:hover) {
  text-decoration: underline;
}
</style>

