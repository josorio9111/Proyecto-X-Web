<template>
  <v-window-item :value="2">
    <v-row class="fill-height">
      <v-col cols="12" md="4" class="bg-primary pb-12">
        <v-card-text class=" mt-12">
          <h1 class="text-center display-1">Welcome Back!</h1>
          <h5 class="text-center">
            To Keep connected with us please login with your
            personnel info
          </h5>
        </v-card-text>
        <div class="text-center">
          <v-btn rounded @click="step--" class="text-capitalize" variant="outlined">Login
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="8">
        <v-card-text class="my-7 mx-16 text-center" elevation="0">
          <h1 class=" text-primary">Create Account</h1>
          <div class=" mt-10">
            <v-form v-model="formRegister.validR" fast-fail>
              <v-text-field v-model="formRegister.emailR" :rules="rules.emailRules" prepend-icon="mdi-email-outline"
                label="Correo" required variant="outlined" clearable class="mb-2" color="primary" />

              <v-text-field v-model="formRegister.passwR" :rules="rules.passwRules"
                :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" prepend-icon="mdi-lock-outline" label="Contraseña"
                :type="show2 ? 'text' : 'password'" required variant="outlined" class="mb-2"
                @click:append-inner="show2 = !show2" color="primary" />

              <v-btn :disabled="!formRegister.validR" :loading="loading" size="large" class="text-capitalize" rounded
                color="primary" append-icon="mdi-arrow-right" @click.prevent="createUser" variant="flat">Registrarse
              </v-btn>
            </v-form>
            <p class="text-body-2 font-weight-light mt-5">
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
</template>

<script lang="ts" setup>
import Social from "./Social.vue";
import router from "@/router";
import { ref } from "vue";
import { auth } from "@/main";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";
import { rules } from "@/utils/rules"

const show2 = ref(false)
const { menssage, loading, step } = storeToRefs(myStore());

const formRegister = ref({
  emailR: 'test1@test.com',
  passwR: '123456',
  validR: false,
})

const createUser = async () => {
  loading.value = true;
  if (formRegister.value.validR) {
    await createUserWithEmailAndPassword(auth, formRegister.value.emailR, formRegister.value.passwR)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken()
        localStorage.setItem('token', token)
        router.push({ name: "home" });
      }).catch((error) => {
        menssage.value = error.message;
      })
  }
  loading.value = false
}
</script>

<style scope></style>