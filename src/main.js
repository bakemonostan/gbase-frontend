import {createApp} from "vue";
import App from "./AppImport.vue";
import {VueCsvImportPlugin} from "vue-csv-import";
import './assets/tailwind.css'

createApp(App)
    .use(VueCsvImportPlugin)
    .mount("#app");