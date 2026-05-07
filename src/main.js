import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
  },
)

const app = createApp(App)

app.directive('reveal', {
  mounted(el) {
    el.classList.add('reveal-block')
    revealObserver.observe(el)
  },
  unmounted(el) {
    revealObserver.unobserve(el)
  },
})

app.mount('#app')

