import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import 'misans/lib/Normal/MiSans-Regular.min.css'
import './styles/fonts.css'
import './styles/main.css'

createApp(App).use(i18n).mount('#app')
