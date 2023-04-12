<template>
  <v-layout>
    <Drawer></Drawer>
    <AppBar title="Example"></AppBar>
    <Main></Main>
  </v-layout>
</template>

<script setup lang="ts">
import AppBar from "../components/Homeview/AppBar.vue";
import Drawer from "../components/Homeview/Drawer.vue";
import Main from "../components/Homeview/Main.vue";
</script>
