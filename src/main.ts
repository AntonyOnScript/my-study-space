import { createApp } from "vue"
import { Quasar } from 'quasar'
import App from "./App.vue"
import router from "~/router/router"
import { createPinia } from "pinia"
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import 'quasar/src/css/index.sass'
import 'uno.css'

const pinia = createPinia()
const app = createApp(App)

app.use(Quasar, {
    plugins: {}
})
app.use(pinia)
app.use(router)

app.mount('#app')