import { createRouter, createWebHistory } from 'vue-router'
import Blog from '../views/Blog.vue'
import About from '../views/About.vue'
import Post from '../views/Post.vue'
import Cv from '../views/Cv.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Cv
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/antonios-pavlakis-cv',
    redirect: to => ({ path: '/', query: to.query, hash: to.hash })
  },
  {
    path: '/posts/:slug',
    name: 'Post',
    component: Post,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Smooth scroll behavior for better UX
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Error handling for navigation failures
router.onError((error) => {
  console.error('Router error:', error)
})

export default router

