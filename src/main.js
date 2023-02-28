import {createApp} from "vue";
import App from "./AppImport.vue";
import {VueCsvImportPlugin} from "vue-csv-import";
import './assets/tailwind.css'

createApp(App)
    .use(VueCsvImportPlugin)
    .mount("#app");


    // const columnHeader = reactive({
    //   'Unique Id': [],
    //   Type: [],
    //   Make: [],
    //   Model: [],
    //   Year: [],
    //   Color: [],
    //   Condition: [],
    //   Case: [],
    //   Price: [],
    //   Description: [],
    //   Picture1: [],
    //   Picture2: [],
    //   Picture3: [],
    //   Picture4: [],
    //   Picture5: [],
    //   Picture6: [],
    //   'Dealer Key': [],
    //   'Dealer Notes': [],
    //   'Offsite Link #1 Label': [],
    //   'Offsite Link #1 Url': [],
    //   'Offsite Link #2 Label': [],
    //   'Offsite Link #2 Url': []
    // })
