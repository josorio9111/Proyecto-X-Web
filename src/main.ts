import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// Icons
import '@mdi/font/css/materialdesignicons.min.css'
//Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { VueFire, VueFireAuth } from 'vuefire'
// Store
import { myStore } from '@/stores/store'

const firebaseConfig = {
  apiKey: "AIzaSyDHftGPOro71cAXrc272lS1HsEEgc_BfNE",
  authDomain: "vue-proyect-f1474.firebaseapp.com",
  projectId: "vue-proyect-f1474",
  storageBucket: "vue-proyect-f1474.appspot.com",
  messagingSenderId: "633241192338",
  appId: "1:633241192338:web:090c3af10a57c6ac6fa34b",
  measurementId: "G-7PJG17QKRK"
};

const light = {
  dark: false,
  colors: {
    background: '#f4f4f8',
    surface: '#ffffff',
    primary: '#ff724c',
    secondary: '#fdbf50',
  }
}
const dark = {
  dark: true,
  colors: {
    background: '#111111',
    surface: '#2a2c41',
    primary: '#ff724c',
    secondary: '#fdbf50',
  }
}

const vuetify = createVuetify({
  theme: {
    themes: { light, dark }
  },
  icons: {
    defaultSet: 'mdi',
    sets: {}
  },
  components,
  directives,
})

const app = createApp(App)

const appf = initializeApp(firebaseConfig);
getAnalytics(appf);
export const auth = getAuth(appf)

const pinnia = createPinia()

app.use(pinnia)
app.use(router)
app.use(vuetify)
app.use(VueFire, {
  firebaseApp: appf,
  modules: [
    VueFireAuth(),
  ],
})
app.mount('#app')

// /* Dark mode */
if (localStorage['darkMode'] === "dark") {
  const mio = myStore(pinnia)
  mio.toggleTheme(true);
}

/* Default title tag */
const defaultDocumentTitle = "Project-X";

/* Set document title from route meta or name*/
router.afterEach((to) => {
  if (to.name) {
    const nombre = to.name.toString()[0].toUpperCase() + to.name.toString().slice(1)
    document.title = to.name ? nombre + ' - ' + defaultDocumentTitle : defaultDocumentTitle;
  }
});