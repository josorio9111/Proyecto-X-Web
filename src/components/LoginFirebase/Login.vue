<template>
  <v-window-item :value="1">
    <v-row>
      <v-col cols="12" md="8">
        <v-card-text class="text-center my-7 mx-16" elevation="0">
          <h1 class=" text-primary">Login</h1>
          <div class=" mt-12">
            <v-form v-model="form.valid" fast-fail class="mb-5">
              <v-text-field v-model="form.email" :rules="rules.emailRules" prepend-icon="mdi-email-outline" label="Correo"
                variant="outlined" required clearable class="mb-2" color="primary" />
              <v-text-field v-model="form.passw" :rules="rules.passwRules" prepend-icon="mdi-lock-outline"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" variant="outlined" label="Contraseña"
                :type="show1 ? 'text' : 'password'" required class="mb-2" @click:append-inner="show1 = !show1"
                color="primary" />
              <v-btn :disabled="!form.valid" :loading="loading" size="large" class="text-capitalize" rounded
                color="primary" append-icon="mdi-arrow-right" @click.prevent="logginEmailPassword"
                variant="flat">Acceder</v-btn>
            </v-form>
            <span class="text-body-2 font-weight-light">
              Otras formas
            </span>
            <v-divider class="mt-2"></v-divider>
            <v-row justify="space-evenly" class="mt-4">
              <Social></Social>
            </v-row>
          </div>
        </v-card-text>
      </v-col>
      <v-col cols="12" md="4" class="bg-primary d-flex flex-column  align-center">
        <v-card-text class="mt-12">
          <h1 class="text-center display-1">Hello, Friend!</h1>
          <h5 class="text-center mt-2">
            Enter your personal details and start journay with us
          </h5>
          <div class="text-center mt-3">
            <v-btn rounded @click="step++" class="text-capitalize" variant="outlined">Registrarse
            </v-btn>
          </div>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-switch :ripple="false" @update:model-value="toggleTheme" hide-details inset true-value="dark"
          false-value="ligth" :model-value="darkMode" label="Dark Mode"></v-switch>
      </v-col>
    </v-row>
  </v-window-item>
</template>

<script lang="ts" setup>
import Social from "./Social.vue";
import router from "@/router";
import { ref } from "vue";
import { auth } from "@/main";
import { signInWithEmailAndPassword } from "firebase/auth";
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";
import { rules } from "@/utils/rules"

const store = myStore()
const { menssage, loading, darkMode, step } = storeToRefs(store);
const { toggleTheme } = store
const show1 = ref(false)

const form = ref({
  email: "test1@test.com",
  passw: "123456",
  valid: false,
});

const logginEmailPassword = async () => {
  loading.value = true;
  if (form.value.valid) {
    await signInWithEmailAndPassword(auth, form.value.email, form.value.passw)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken()
        localStorage.setItem('token', token)
        router.push({ name: "home" });
      })
      .catch((error) => {
        menssage.value = error.message;
      });
  }
  loading.value = false;
};

</script>

<style scope></style>