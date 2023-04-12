<template>
  <v-container fluid>
    <v-main style="min-height: 300px">
      <v-sheet class="d-flex flex-wrap">
        <v-col cols="12" :md="productos.length > 0 ? 9 : 12">
          <v-sheet class="d-flex align-center justify-center flex-wrap text-center" elevation="1" height="250" rounded>
            <div>
              <h2 class="text-h4 font-weight-black text-orange">
                Congratulations!
              </h2>
              <div class="text-h5 font-weight-medium mb-2">
                You are officially a part of the Vuetify Community!
              </div>
              <p class="text-body-2 mb-4">
                Please head over to your inbox/spam or others folder to find our
                verificaiton email.
              </p>
              <v-btn variant="text" color="orange">Go to Login</v-btn>
            </div>
          </v-sheet>
          <template v-if="productos.length > 0">
            <v-row dense class="mt-8">
              <v-col v-for="(item, n) in productos" :key="n" cols="12" md="6" sm="6">
                <v-card>
                  <v-img max-height="250" :src="`http://localhost:3000/api/uploads/productos/${item.id}`" cover
                    class="bg-grey-lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <v-card-title class="text-capitalize">{{ item.nombre }}</v-card-title>
                  <v-card-text class="text-capitalize">{{ item.descripcion }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-col>

        <template v-if="productos.length > 0">
          <v-col md="3" cols="12">
            <v-row dense>
              <v-col v-for="(item, n) in productos.slice(0, 2)" :key="n" cols="12" md="12" sm="6">
                <v-card>
                  <v-img class="align-end" height="200" :src="`http://localhost:3000/api/uploads/productos/${item.id}`"
                    cover>
                    <v-card-title class="text-capitalize">{{ item.nombre }}</v-card-title>
                    <v-card-text class="text-capitalize">{{ item.descripcion }}</v-card-text>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </template>
      </v-sheet>
    </v-main>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";
// import { useDisplay } from "vuetify";
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";
import router from "@/router";

const { productos, loading, menssage } = storeToRefs(myStore());
const { initProductos } = myStore()
// const { mdAndDown, smAndDown, mobile } = useDisplay();

onBeforeMount(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return router.push({ name: '/' })
  }
  loading.value = true
  await initProductos(token);
  loading.value = false
});
</script>
