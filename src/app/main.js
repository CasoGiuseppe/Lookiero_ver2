import { createApp } from "vue";
import { createPinia } from "pinia";

// mock data with miragejs
import "@/assets/servers";
import App from "./ui/App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
