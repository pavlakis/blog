<template>
  <div class="about">
    <h1 class="mb-4">About</h1>
    <div class="content">
      <p>
        Hello. My name is Antonis Pavlakis (pronounced Adoni), and I'm a software developer.
        I can be found on
        <a href="https://twitter.com/pavlakis" target="_blank" rel="noopener noreferrer">Twitter</a>
        and
        <a href="https://github.com/pavlakis" target="_blank" rel="noopener noreferrer">GitHub</a>
        under the handle <code>@pavlakis</code>.
      </p>

      <h2 class="mt-4 mb-3">Community</h2>
      <p>
        I've been involved with PHP User Groups since 2010. I was an organiser for
        <a href="https://phpem.uk" target="_blank" rel="noopener noreferrer">PHP East Midlands</a>
        for 5 years, and in 2015 I co-founded
        <a href="https://phpminds.org" target="_blank" rel="noopener noreferrer">PHPMinds</a>
        and I am still one of the organisers.
      </p>

      <h2 class="mt-4 mb-3">Projects</h2>
      <ul>
        <li>
          <a href="https://github.com/pavlakis/notts-digital" target="_blank" rel="noopener noreferrer">
            pavlakis/notts-digital
          </a>
          - The backend for the
          <a href="https://nottingham.digital" target="_blank" rel="noopener noreferrer">
            nottingham.digital
          </a>
          events page
        </li>
        <li>
          <a href="https://github.com/pavlakis/slim-cli" target="_blank" rel="noopener noreferrer">
            pavlakis/slim-cli
          </a>
          - A Slim 3 Framework CLI Request Middleware
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.content {
  line-height: 1.8;
}

code {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}
</style>

