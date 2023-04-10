<template>
  <v-snackbar v-model="snackbar" multi-line elevation="24" dark>
    <div class="text-subtitle-1 pb-2">{{ title }}</div>
    <p>{{ subtitle }}</p>
    <template v-slot:actions>
      <v-btn color="light-blue-accent-3" class="text-white" variant="flat" @click="snackbar = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
defineProps<{
  title?: String;
  subtitle?: String;
}>();

const snackbar = ref(true);
</script>

<style scope></style>
