<template>
  <v-dialog v-model="openDialog" width="350" persistent>
    <v-card class="px-5">
      <template v-slot:loader>
        <v-progress-linear :active="loading" color="deep-purple" height="4" indeterminate></v-progress-linear>
      </template>

      <v-card-title class="text-h5 text-center"> Method send Sms </v-card-title>
      <v-container class="mt-3">
        <template v-if="!hidde">
          <v-row>
            <v-text-field v-model="phone" variant="solo" prepend-inner-icon=" mdi-phone" label="Phone" required
              clearable></v-text-field>
            <v-btn :loading="loading" type="submit" class="mt-1 ml-2" color="blue" icon="mdi-arrow-right"
              @click="logginPhoneNumber" variant="elevated"></v-btn>
          </v-row>
        </template>
        <template v-if="hidde">
          <v-row>
            <v-text-field v-model="code" variant="solo" prepend-inner-icon="mdi-lock-outline" label="Code" required
              clearable></v-text-field>
            <v-btn :loading="loading" class="mt-1 ml-2" color="blue" icon="mdi-arrow-right" @click="verificarOTP"
              variant="elevated"></v-btn>
          </v-row>
        </template>
        <div id="recaptcha-container"></div>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="cerrarDialog">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { auth } from "@/main";
import router from "@/router";
import {
  type ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@firebase/auth";
import { ref, type Ref } from "vue";
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const { menssage, openDialog } = storeToRefs(myStore());
const phone: Ref<string> = ref("+1 650-555-3434");
const code: Ref<string> = ref("123456");
const confirm: Ref<ConfirmationResult> = ref({} as ConfirmationResult);
const loading: Ref<boolean> = ref(false);
const hidde: Ref<boolean> = ref(false);

const logginPhoneNumber = async () => {
  loading.value = true;
  const appVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    { size: "normal" },
    auth
  );
  await signInWithPhoneNumber(auth, phone.value, appVerifier)
    .then(function (confirmationResult) {
      confirm.value = confirmationResult;
      hidde.value = true;
      return confirmationResult;
    })
    .catch((error) => {
      menssage.value = error.message;
    });
  loading.value = false;
};

const verificarOTP = async () => {
  loading.value = true;
  await confirm.value
    .confirm(code.value)
    .then((response) => {
      cerrarDialog();
      router.push({ name: "home" });
    })
    .catch((error) => {
      menssage.value = error;
    });
  loading.value = false;
};

const cerrarDialog = () => {
  hidde.value = false;
  openDialog.value = false;
  loading.value = false;
};
</script>

<style scope></style>
