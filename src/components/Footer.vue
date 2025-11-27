<template>
  <footer class="bg-light mt-5 py-4">
    <div class="container text-center text-muted">
      <p>&copy; {{ new Date().getFullYear() }} pavlakis.dev</p>
      <p>
        <a href="https://github.com/pavlakis" target="_blank" rel="noopener noreferrer" class="text-decoration-none me-3">
          GitHub
        </a>
        <a href="https://twitter.com/pavlakis" target="_blank" rel="noopener noreferrer" class="text-decoration-none">
          Twitter
        </a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
footer {
  margin-top: auto;
}
</style>

