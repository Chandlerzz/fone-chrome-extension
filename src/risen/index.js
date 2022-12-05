import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import jQuery from 'jquery'
window.jQuery = window.$ = jQuery
import element from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(element)
app.mount('#risen')
