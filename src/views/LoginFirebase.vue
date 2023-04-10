<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="7">
          <v-card class="elevation-12">
            <v-window v-model="form.step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="my-7 mx-16" elevation="0">
                      <h1 class="text-center display-2 text-primary">Login</h1>
                      <div class="text-center mt-10">
                        <v-form v-model="form.valid" fast-fail class="text-center mb-5">
                          <v-text-field v-model="form.email" :rules="form.emailRules" prepend-icon="mdi-email"
                            label="Correo" variant="outlined" required clearable color="primary" class="mb-2" />

                          <v-text-field v-model="form.passw" :rules="form.passwRules" prepend-icon="mdi-lock"
                            variant="outlined" label="Contraseña" type="password" required clearable color="primary"
                            class="mb-2" />

                          <v-btn :disabled="!form.valid" :loading="loading" size="large"
                            class="text-capitalize text-h6 dark" rounded outline color="primary-darken-1"
                            append-icon="mdi-arrow-right" @click.prevent="logginEmailPassword" variant="elevated">Acceder
                          </v-btn>
                        </v-form>
                        <span class="text-center text-subtitle-1 font-weight-light">
                          Otras formas
                        </span>
                        <v-divider class="mt-2" color="primary"></v-divider>

                        <v-row justify="space-evenly" class="mt-4">
                          <Social></Social>
                        </v-row>
                      </div>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="4" class="bg-primary d-flex flex-column  align-center">
                    <v-card-text class="text-white mt-12">
                      <h1 class="text-center display-1">Hello, Friend!</h1>
                      <h5 class="text-center mt-2">
                        Enter your personal details and start journay with us
                      </h5>
                      <div class="text-center mt-3">
                        <v-btn rounded @click="form.step++" class="text-capitalize text-h6 dark text-primary">Registrarse
                        </v-btn>
                      </div>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-switch :ripple="false" @update:model-value="toggleTheme" hide-details inset true-value="dark"
                      false-value="ligth" :model-value="darkMode" label="Dark Mode"></v-switch>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="bg-primary pb-12">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">Welcome Back!</h1>
                      <h5 class="text-center">
                        To Keep connected with us please login with your
                        personnel info
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded @click="form.step--" class="text-capitalize text-h6 dark text-primary">Login
                      </v-btn>
                    </div>
                  </v-col>

                  <v-col cols="12" md="8">
                    <v-card-text class="my-7 mx-16" elevation="0">
                      <h1 class="text-center text-primary">
                        Create Account
                      </h1>
                      <div class="text-center mt-10">
                        <v-form v-model="formRegister.validR" fast-fail @submit.prevent class="text-center">
                          <v-text-field v-model="formRegister.emailR" :rules="form.emailRules" prepend-icon="mdi-email"
                            label="Correo" required variant="outlined" clearable color="primary" class="mb-2" />
                          <v-text-field v-model="formRegister.passwR" :rules="form.passwRules" prepend-icon="mdi-lock"
                            label="Contraseña" type="password" required variant="outlined" clearable color="primary"
                            class="mb-2" />
                          <v-btn :disabled="!formRegister.validR" :loading="loading" size="large"
                            class="text-capitalize text-h6 dark" rounded outline color="primary"
                            append-icon="mdi-arrow-right" @click.prevent="createUser" variant="elevated">Registrarse
                          </v-btn>
                        </v-form>
                        <p class="text-center text-subtitle-1 font-weight-light mt-4">
                          Otras formas
                        </p>
                        <v-divider class="mt-2"></v-divider>

                        <v-row justify="space-evenly" class="mt-4">
                          <Social></Social>
                        </v-row>
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
      <Dialog></Dialog>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import Dialog from "../components/LoginFirebase/Dialog.vue";
import Social from "../components/LoginFirebase/Social.vue";
import router from "@/router";
import { ref, type Ref } from "vue";
import { auth } from "@/main";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const store = myStore()
const { menssage, loading, darkMode } = storeToRefs(store);
const { toggleTheme } = store
const form = ref({
  email: "test1@test.com",
  passw: "123456",
  valid: false,
  step: 1,
  emailRules: [
    (value: string) => {
      if (value) return true;
      return "El correo es obligatorio.";
    },
    (value: string) => {
      if (/.+@.+\..+/.test(value)) return true;
      return "El correo no es válido.";
    },
  ],
  passwRules: [
    (value: string) => {
      if (value) return true;
      return "La contraseña es obligatoria.";
    },
    (value: string) => {
      if (value.length >= 6) return true;
      return "La contraseña debe tener 6 caracteres.";
    },
  ]
});
const formRegister = ref({
  emailR: 'test1@test.com',
  passwR: '123456',
  validR: false
})

auth.useDeviceLanguage();
// auth.languageCode = "es";
auth.settings.appVerificationDisabledForTesting = true;

const createUser = async () => {
  loading.value = true;
  if (formRegister.value.validR) {
    await createUserWithEmailAndPassword(auth, formRegister.value.emailR, formRegister.value.passwR).then((userCredential) => {
      router.push({ name: "home" });
    }).catch((error) => {
      menssage.value = error.message;
    })
  }
  loading.value = false
}

const logginEmailPassword = async () => {
  loading.value = true;
  if (form.value.valid) {
    await signInWithEmailAndPassword(auth, form.value.email, form.value.passw)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken(true)
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
