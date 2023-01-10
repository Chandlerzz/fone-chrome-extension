import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import element from 'element-plus';
import 'element-plus/dist/index.css';
import { useMainStore,pinia } from '../stores/main.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const store = useMainStore(pinia);
store.getDataFromLocalStorage();

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(element);
app.use(router);
app.use(pinia);
app.mount('#risen');
