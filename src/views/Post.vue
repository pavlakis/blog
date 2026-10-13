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
      <RouterLink to="/blog" class="btn btn-outline-primary">
        ← Back to Blog
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { posts } from '../data/posts'
import { useSEO } from '../composables/useSEO'

const route = useRoute()
const post = computed(() => posts.find(entry => entry.slug === route.params.slug))

useSEO(() => ({
  title: post.value ? `${post.value.title} | Antonios Pavlakis` : 'Post not found | Antonios Pavlakis',
  description: post.value?.summary || 'This blog post could not be found.',
  ogType: 'article',
  url: `https://pavlakis.dev${route.path}`
}))

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
})
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

