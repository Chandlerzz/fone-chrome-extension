import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

createApp(App).mount('#risen')
