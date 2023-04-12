<template>
  <v-app-bar flat style="position: fixed;">
    <template v-slot:prepend>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-app-bar-nav-icon>
      <v-app-bar-title class="ml-5">{{ title }}</v-app-bar-title>
      <v-btn class="text-capitalize ml-5 miHover rounded-lg text-body-2" prepend-icon="mdi-magnify" variant="plain"
        @click="dialog = true">
        Search <v-icon icon="mdi-apple-keyboard-command" class="ml-2"></v-icon>K

        <Teleport to="body">
          <v-dialog v-model="dialog" width="auto">
            <v-card>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore
                magna aliqua.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </Teleport>
      </v-btn>
    </template>

    <!-- <input @keyup.ctrl.k="dialog = true" autofocus style="opacity: 0;" /> -->

    <template v-slot:append>
      <div class="hidden-sm-and-down">
        <template v-if="categorias.length > 0">
          <v-menu open-on-hover class="px-3">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="text-body-2 text-capitalize text-medium-emphasis">Categorias
                <v-icon icon="mdi-chevron-down"></v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="item in categorias" :key="item.id" @click="_onClickItem(item.id)">
                <v-list-item-title class="text-capitalize text-body-2"> {{ item.nombre.toLowerCase() }}
                </v-list-item-title>
              </v-list-item>
            </v-list>

          </v-menu>
        </template>
      </div>
      <v-divider :vertical="true" class="mx-3 my-auto" style="height: 20px"></v-divider>
      <v-switch @update:model-value="toggleTheme" hide-details inset true-value="dark" false-value="light"
        :model-value="darkMode" true-icon="mdi-weather-night rounded-circle bg-black"
        false-icon="mdi-weather-sunny text-white v-btn--icon">
      </v-switch>
      <v-divider :vertical="true" class="mx-3 my-auto" style="height: 20px"></v-divider>

      <v-btn class="v-btn--icon" @click="logout">
        <v-icon icon="mdi-logout"></v-icon>
        <v-tooltip activator="parent" location="bottom">Cerrar Sessión
        </v-tooltip>
      </v-btn>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import { myStore } from "@/stores/store";
import { storeToRefs } from "pinia";
import router from "@/router";
import { signOut } from "firebase/auth";

import { ref } from 'vue';
import { auth } from "@/main";

defineProps({
  title: String,
});

const { drawer, categorias, darkMode } = storeToRefs(myStore());
const { toggleTheme } = myStore()
const dialog = ref<boolean>(false)

const logout = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem('token')
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log(error);
    });
};
const _onClickItem = (id: string) => {
  console.log(id);
};
</script>

<style scoped>
.miHover:hover {
  border: 1px solid #03A9F4;
}
</style>