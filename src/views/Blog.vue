<template>
  <div class="blog">
    <section id="main" class="index">
      <div class="post-list">
        <h1 class="mb-4">Recent Posts</h1>
        <PostPreview 
          v-for="post in posts" 
          :key="post.slug" 
          :post="post"
        />
      </div>
    </section>
  </div>
</template>
<script setup>
import PostPreview from '../components/PostPreview.vue'
import { posts as allPosts } from '../data/posts'
import { useSEO } from '../composables/useSEO'

const posts = [...allPosts].sort((a, b) => new Date(b.date) - new Date(a.date))

useSEO({
  title: 'Blog | Antonios Pavlakis',
  description: 'Articles by Antonios Pavlakis about web development, programming, and technology.',
  url: 'https://pavlakis.dev/blog'
})
</script>
<style scoped>
.blog {
  max-width: 800px;
  margin: 0 auto;
}
</style>
