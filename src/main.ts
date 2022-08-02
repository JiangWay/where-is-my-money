import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// calendar套件
import "v-calendar/dist/style.css";
import VCalendar from 'v-calendar';

// sqlite
import { useSQLite } from 'vue-sqlite-hook';
import { useState } from '@/composables/state';

//Existing Connections
const [existConn, setExistConn] = useState(false);

// Listeners onProgressImport and Export
const [jsonListeners, setJsonListeners] = useState(false);
const [isModal, setIsModal] = useState(false);
const [message, setMessage] = useState("");



const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VCalendar, {});

router.isReady().then(() => {
  app.mount('#app');
});