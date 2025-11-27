<template>
  <div id="app">
    <Header />
    <main class="container mt-4">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    RouterView,
    Header,
    Footer
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>

