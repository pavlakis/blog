import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useSEO(meta = {}) {
  const route = useRoute()

  const updateMeta = () => {
    // Update title
    if (meta.title) {
      document.title = meta.title
    }

    // Update or create meta tags
    const metaTags = {
      description: meta.description,
      keywords: meta.keywords,
      author: meta.author || 'Antonios Pavlakis',
      'og:title': meta.title,
      'og:description': meta.description,
      'og:type': meta.ogType || 'website',
      'og:url': meta.url || window.location.href,
      'og:image': meta.image,
      'twitter:card': 'summary_large_image',
      'twitter:title': meta.title,
      'twitter:description': meta.description,
      'twitter:image': meta.image
    }

    Object.entries(metaTags).forEach(([name, content]) => {
      if (content) {
        const property = name.startsWith('og:') ? 'property' : 'name'
        let element = document.querySelector(`meta[${property}="${name}"]`)

        if (!element) {
          element = document.createElement('meta')
          element.setAttribute(property, name)
          document.head.appendChild(element)
        }

        element.setAttribute('content', content)
      }
    })

    // Add canonical link
    if (meta.canonical || meta.url) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', meta.canonical || meta.url || window.location.href)
    }
  }

  onMounted(() => {
    updateMeta()
  })

  watch(() => route.path, () => {
    updateMeta()
  })

  return {
    updateMeta
  }
}

