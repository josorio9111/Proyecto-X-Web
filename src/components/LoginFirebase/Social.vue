<template>
    <v-btn size="small" class="v-btn--icon" variant="outlined" @click="loginGoogle">
        <v-icon icon="mdi-google"></v-icon>
        <v-tooltip activator="parent" location="top">Google</v-tooltip>
    </v-btn>
    <v-btn size="small" class="v-btn--icon" variant="outlined" @click="loginFacebook" disabled>
        <v-icon icon="mdi-facebook"></v-icon>
        <v-tooltip activator="parent" location="top">Facebook</v-tooltip>
    </v-btn>
    <v-btn size="small" class="v-btn--icon" variant="outlined" @click="loginTwitter">
        <v-icon icon="mdi-twitter"></v-icon>
        <v-tooltip activator="parent" location="top">Twitter</v-tooltip>
    </v-btn>
    <v-btn size="small" class="v-btn--icon" variant="outlined" @click="loginGithub">
        <v-icon icon="mdi-github"></v-icon>
        <v-tooltip activator="parent" location="top">Github</v-tooltip>
    </v-btn>
    <v-btn size="small" class="v-btn--icon" variant="outlined" @click="openDialog = true">
        <v-icon icon="mdi-phone"></v-icon>
        <v-tooltip activator="parent" location="top">Cellphone</v-tooltip>
    </v-btn>
</template>

<script lang="ts" setup>
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";
import { auth } from '@/main';
import router from '@/router';
const store = myStore()
const { openDialog, menssage, loading } = storeToRefs(store);

const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    logginSocial(provider);
};

const loginFacebook = async () => {
    const provider = new FacebookAuthProvider();
    logginSocial(provider);
};

const loginTwitter = async () => {
    const provider = new TwitterAuthProvider();
    logginSocial(provider);
};

const loginGithub = async () => {
    const provider = new GithubAuthProvider();
    logginSocial(provider);
};

const logginSocial = async (
    provider:
        | GoogleAuthProvider
        | FacebookAuthProvider
        | TwitterAuthProvider
        | GithubAuthProvider
) => {
    loading.value = true;
    await signInWithPopup(auth, provider)
        .then(async (userCredential) => {
            const token = await userCredential.user.getIdToken(true)
            localStorage.setItem('token', token)
            router.push({ name: "home" });
        })
        .catch((error) => {
            menssage.value = error.message;
        });
    loading.value = false;
};
</script>