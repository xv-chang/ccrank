import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.use(router)
app.use(vuex)
app.mount('#app')
