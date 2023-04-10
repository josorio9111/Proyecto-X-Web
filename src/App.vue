<template>
  <v-app>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute color="deep-purple-accent-4" />

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
import { onMounted } from 'vue';
import { useTheme } from 'vuetify';
const { menssage, loading } = storeToRefs(myStore());
const theme = useTheme()

// onMounted(() => {
//   theme.global.name.value = localStorage['darkMode'] === '1' ? 'dark' : 'light'
// })
const asd = () => {
  console.log('prueba');
}
</script>
