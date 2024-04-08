import './assets/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apolloClient'
import { provideAuthService } from './context/authService'

const app = createApp(App)
provideAuthService()
app.provide(DefaultApolloClient, apolloClient)

app.use(router)

app.mount('#app')
