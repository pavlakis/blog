<template>
  <header class="bg-light shadow-sm">
    <nav class="navbar navbar-expand-lg navbar-light container">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">Antonios Pavlakis</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about">
                <i class="fa fa-heart"></i> about
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/antonios-pavlakis-cv">
                <i class="fa fa-file-text"></i> CV
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Header',
  components: {
    RouterLink
  }
}
</script>

<style scoped>
header {
  margin-bottom: 2rem;
}

.navbar-brand {
  font-weight: 600;
}

.nav-link {
  transition: color 0.3s ease;
}
</style>

