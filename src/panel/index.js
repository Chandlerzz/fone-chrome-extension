import { createApp } from "vue";
import "./style.css";
import App from "./panel.vue";
const test = [
  "f_selectedCompany",
  "f_userInfo",
  "f_lastSelectedApplication",
  "f_authorization",
  "f_ignoreValidateUserLogin",
];
chrome.devtools.inspectedWindow.eval(
  'window.localStorage.getItem("f_userInfo")',
  function (value) {
  },
);

createApp(App).mount("#app");
