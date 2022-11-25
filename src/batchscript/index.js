import { createApp } from "vue";
import router from "./router";
import beforeEach from "./router/beforeEach.js";
import App from "./App.vue";
import element from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import jQuery from "jquery";
window.jQuery = window.$ = jQuery;

const pinia = createPinia();
const app = createApp(App);

router.beforeEach(beforeEach);

app.use(element);
app.use(router);
app.use(pinia);
app.mount("#risen");
