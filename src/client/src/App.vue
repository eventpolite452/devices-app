<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <v-layout>
    <v-app-bar
      class="header"
      style="background-color: rgb(9 117 169)"
      title="Devices"
    >
      <v-btn to="/addDevice" exact>
        Add device
      </v-btn>
    </v-app-bar>
    <RouterView />
  </v-layout>
</template>
