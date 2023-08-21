import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_URL_API;
createApp(App).use(createPinia()).mount("#app");
