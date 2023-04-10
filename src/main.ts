import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify, useTheme } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// Icons
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
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

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#FFFFFF',
                    surface: '#FFFFFF',
                    primary: '#00B0FF',
                    'primary-darken-1': '#0091EA',
                    secondary: '#03DAC6',
                    'secondary-darken-1': '#018786',
                    error: '#B00020',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                }
            }
        }
    },
    components,
    directives,
})
const app = createApp(App)

const appf = initializeApp(firebaseConfig);
const analytics = getAnalytics(appf);
export const auth = getAuth(appf)

app.use(VueFire, {
    firebaseApp: appf,
    modules: [
        VueFireAuth(),
    ],
})

const pinnia = createPinia()

app.use(pinnia)
app.use(router)
app.use(vuetify)
.mount('#app')

// store init
const mio = myStore(pinnia)

// /* Dark mode */
if (localStorage['darkMode'] === "dark") {
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