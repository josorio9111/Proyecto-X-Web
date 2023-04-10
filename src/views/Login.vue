<template>
  <v-layout>
    <v-container>
      <v-card class="bg-deep-purple">
        <v-row no-gutters>
          <v-col>
            <v-sheet class="bg-deep-purple pa-12" rounded>
              <v-card class="mx-auto px-6 py-8" max-width="350">
                <v-form v-model="valid" fast-fail @submit.prevent class="text-center">
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="email" :rules="emailRules" variant="solo"
                          prepend-inner-icon="md-email mdi-email" label="Correo" required clearable></v-text-field>

                        <v-text-field v-model="passw" :rules="passwRules" variant="solo"
                          prepend-inner-icon="mdi-lock-outline" label="Contraseña" type="password" required
                          clearable></v-text-field>

                        <!-- :disabled="!valid" -->
                        <v-btn :loading="loading" size="large" type="submit" block class="mt-2 text-capitalize text-h6"
                          color="success" append-icon="mdi-rocket-launch-outline" @click="validate"
                          variant="elevated">Acceder</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col>Valid: {{ valid }} -- {{ email }} -- {{ passw }}</v-col>
        </v-row>
      </v-card>

      <template v-if="menssage.length > 0">
        <SnackBar title="Mensaje" :subtitle="menssage"></SnackBar>
      </template>
    </v-container>
  </v-layout>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref, type Ref, onMounted } from "vue";
import { myStore } from "@/stores/store";
import SnackBar from "../components/SnackBar.vue";
import ServiceAuth from "../services/AuthService";
import { storeToRefs } from "pinia";

const auth = new ServiceAuth();
const store = myStore();
// const { usuario } = storeToRefs(store);
const valid: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const email: Ref<string> = ref("test1@test.com");
const passw: Ref<string> = ref("123456");
const emailRules: Ref = ref([
  (value: string) => {
    if (value) return true;
    return "E-mail is required.";
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "E-mail must be valid.";
  },
]);
const passwRules: Ref = ref([
  (value: string) => {
    if (value) return true;
    return "Password is required.";
  },
  (value: string) => {
    if (value.length >= 6) return true;
    return "Name must be less than 6 characters.";
  },
]);
const menssage: Ref<string> = ref("");

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    await auth.validarJWT(token);
    const result = auth.getValid();
    if (result.token && result.usuario) {
      localStorage.setItem("token", result.token);
      // usuario.value = result.usuario;
      router.push({ name: "home" });
    }
  }
});

const validate = async () => {
  loading.value = true;
  if (valid.value) {
    await auth.login(email.value, passw.value);
    const data = auth.getData();
    if (data.message) {
      menssage.value = data.message;
    }
    if (data.token && data.usuario) {
      localStorage.setItem("token", data.token);
      // usuario.value = data.usuario;
      router.push({ name: "home" });
    }
  }
  loading.value = false;
};
</script>

<style scope></style>
