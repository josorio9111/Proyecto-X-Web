<template>
  <v-navigation-drawer v-model="drawer" :location="location" :rail="rail" style="position: fixed;">
    <v-list>
      <v-list-item :prepend-avatar="currentUser.foto" :title="currentUser.nombre || currentUser.email"
        :subtitle="currentUser.email" :prepend-icon="!currentUser.foto ? `mdi-account` : ``">
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <template v-if="categorias.length > 0">
      <v-list>
        <v-list-item variant="plain" v-for="item in categorias" :key="item.id" @click="_onClickItem(item.id)"
          prepend-icon="mdi-view-dashboard">
          <v-list-item-title class="text-capitalize text-body-1"> {{ item.nombre.toLowerCase() }} </v-list-item-title>
          <v-list-item-subtitle class="text-capitalize text-body-3"> Categoria </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";
import { ref, onBeforeMount } from 'vue';
import { getCurrentUser } from 'vuefire';
import router from '@/router';

const currentUser = ref({
  nombre: '',
  foto: '',
  email: ''
})
const { drawer, categorias, loading } = storeToRefs(myStore());
const { initCategorias } = myStore()

onBeforeMount(async () => {
  await getMyCategorias();
  const user = await getCurrentUser()
  currentUser.value.nombre = user?.displayName || ''
  currentUser.value.foto = user?.photoURL || ''
  currentUser.value.email = user?.email || ''
});

const props = defineProps<{
  location?: "end" | "start" | "left" | "top" | "bottom" | "right";
  rail?: boolean;
  permanent?: boolean;
}>();

async function getMyCategorias() {
  const token = localStorage.getItem('token')
  if (!token) {
    return router.push({ name: '/' })
  }
  loading.value = true
  await initCategorias(token)
  loading.value = false
}

const _onClickItem = (id: string) => {
  console.log(id);
};
</script>
