//Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { VueFire, VueFireAuth } from 'vuefire'

const firebaseConfig = {
    apiKey: "AIzaSyDHftGPOro71cAXrc272lS1HsEEgc_BfNE",
    authDomain: "vue-proyect-f1474.firebaseapp.com",
    projectId: "vue-proyect-f1474",
    storageBucket: "vue-proyect-f1474.appspot.com",
    messagingSenderId: "633241192338",
    appId: "1:633241192338:web:090c3af10a57c6ac6fa34b",
    measurementId: "G-7PJG17QKRK"
};

const appf = initializeApp(firebaseConfig);
getAnalytics(appf);
export const auth = getAuth(appf)