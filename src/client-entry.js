import { app, router } from './app'

router.onReady(() => {
  app.$mount('#app')
})

// Remove it now as Vue loader is now do this
// if (module.hot) {
//   module.hot.accept()
// }
