import { onMounted, onUnmounted } from 'vue'

export function useStructuredData(data) {
  let script

  onMounted(() => {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  })

  onUnmounted(() => {
    script?.remove()
  })
}
