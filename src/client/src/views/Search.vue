<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, watch } from 'vue';
import type { devices as Device } from '@prisma/client';
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table';

const headers: Header[] = [
  { text: 'ID', value: 'id' },
  { text: 'Model', value: 'model' },
  { text: 'Brand', value: 'brand' },
  { text: 'OS', value: 'os' },
  { text: 'New', value: 'is_new' },
];

const router = useRouter();
const route = useRoute();

const items = ref([]);
const loading = ref(true);
const serverItemsLength = ref(0);
const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 20,
});

async function getDevices() {
  loading.value = true;
  const type = route.query.type;
  const search = route.query.search;
  if (!type || !search) {
    throw new Error("Invalid search params");
  }
  const params = new URLSearchParams({
    type: type.toString(),
    search: search.toString(),
  });
  const response = await fetch('/api/devices/search?' + params);
  const data = await response.json();

  items.value = data.devices;
  serverItemsLength.value = data.count;
  loading.value = false;
}

getDevices();
</script>

<template>
    <v-main style="min-height: 300px">
      <EasyDataTable
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="loading"
        :headers="headers"
        :items="items"
        theme-color="#282828"
        table-class-name="customize-table"
      />
    </v-main>
</template>

<style scoped>
.customize-table {
  --easy-table-border: 1px solid #383838;
  --easy-table-row-border: 1px solid #383838;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #282828;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #282828;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #c0c7d2;
  --easy-table-body-row-hover-background-color: #383838;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #383838;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
