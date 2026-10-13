import { onMounted, toValue, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useSEO(meta = {}) {
  const route = useRoute()

  const updateMeta = () => {
    const pageMeta = toValue(meta)
    // Update title
    document.title = pageMeta.title || 'Antonios Pavlakis'

    // Update or create meta tags
    const metaTags = {
      description: pageMeta.description,
      keywords: pageMeta.keywords,
      author: pageMeta.author || 'Antonios Pavlakis',
      'og:title': pageMeta.title,
      'og:description': pageMeta.description,
      'og:type': pageMeta.ogType || 'website',
      'og:url': pageMeta.url || window.location.href,
      'og:image': pageMeta.image,
      'twitter:card': 'summary_large_image',
      'twitter:title': pageMeta.title,
      'twitter:description': pageMeta.description,
      'twitter:image': pageMeta.image
    }

    Object.entries(metaTags).forEach(([name, content]) => {
      const property = name.startsWith('og:') ? 'property' : 'name'
      let element = document.querySelector(`meta[${property}="${name}"]`)
      if (content) {
        if (!element) {
          element = document.createElement('meta')
          element.setAttribute(property, name)
          document.head.appendChild(element)
        }

        element.setAttribute('content', content)
      } else {
        element?.remove()
      }
    })

    // Add canonical link
    if (pageMeta.canonical || pageMeta.url) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', pageMeta.canonical || pageMeta.url)
    } else {
      document.querySelector('link[rel="canonical"]')?.remove()
    }
  }

  onMounted(() => {
    updateMeta()
  })

  watch(() => [route.fullPath, toValue(meta)], () => {
    updateMeta()
  })

  return {
    updateMeta
  }
}

