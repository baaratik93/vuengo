import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:5200/api";
createApp(App).use(createPinia()).mount("#app");
