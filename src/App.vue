<template>
  <v-app>
    <v-progress-linear :active="loading" :indeterminate="loading" absolute color="primary"
      style="z-index:9999 ;" />
    <RouterView />
    <template v-if="menssage.length > 0 && !loading">
      <SnackBar title="Mensaje" :subtitle="menssage"></SnackBar>
    </template>
  </v-app>
</template>

<script setup lang="ts">
import SnackBar from "./components/SnackBar.vue";
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";
const { menssage, loading } = storeToRefs(myStore());
</script>
