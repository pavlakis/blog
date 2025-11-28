<template>
  <div class="home">
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
<script>
import { ref, onMounted } from 'vue'
import PostPreview from '../components/PostPreview.vue'
import { posts } from '../data/posts'
export default {
  name: 'Home',
  components: {
    PostPreview
  },
  setup() {
    const postsList = ref([])
    onMounted(() => {
      // Sort posts by date, most recent first
      postsList.value = posts.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      )
    })
    return {
      posts: postsList
    }
  }
}
</script>
<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}
</style>
