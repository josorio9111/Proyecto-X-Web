<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="7">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <Login></Login>
              <Register></Register>
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
import Register from "../components/LoginFirebase/Register.vue";
import Login from "../components/LoginFirebase/Login.vue";
import { auth } from "@/main";
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const { step } = storeToRefs(myStore());

auth.useDeviceLanguage();
auth.settings.appVerificationDisabledForTesting = true;
</script>