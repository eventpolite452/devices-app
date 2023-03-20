<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import type { devices as Device } from '@prisma/client';
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table';

const headers: Header[] = [
  { text: 'ID', value: 'id' },
  { text: 'Model', value: 'model' },
  { text: 'Brand', value: 'brand' },
  { text: 'OS', value: 'os' },
  { text: 'New', value: 'is_new' },
  { text: 'Edit', value: 'operation' },
];

const router = useRouter();

const items = ref([]);
const loading = ref(true);
const serverItemsLength = ref(0);
const searchQuery = ref('');
const searchBy = ref('ID');

async function getDevices() {
  loading.value = true;
  const response = await fetch('/api/devices');
  const data = await response.json();

  items.value = data.devices;
  serverItemsLength.value = data.count;
  loading.value = false;
}

function submitForm(evt: any) {
  const data = new FormData(evt.target);
  router.push({
    path: '/search',
    query: {
      type: searchBy.value,
      search: searchQuery.value,
    },
  });
}

getDevices();

function updateDevice(id: string) {
  console.log('i got ehreeee');
  router.push({
    path: '/updateDevice',
    query: {
      id,
    },
  });
}
</script>

<template>
  <v-main style="min-height: 300px">
    <v-container style="display: flex">
      <v-form
        @submit.prevent="submitForm"
        style="display: flex; width: 100%; align-items: center"
      >
        <v-text-field
          v-model="searchQuery"
          style="margin: 0rem 1rem"
          type="text"
          id="search-query"
          label="Search query"
        />
        <v-select
          v-model="searchBy"
          style="margin: 0rem 1rem"
          id="dropdown-list"
          label="Search by:"
          :items="['ID', 'Brand', 'OS', 'Model']"
        >
        </v-select>
        <v-btn type="submit">Search</v-btn>
      </v-form>
    </v-container>
    <EasyDataTable
      :server-items-length="serverItemsLength"
      :loading="loading"
      :headers="headers"
      :items="items"
      theme-color="#282828"
      table-class-name="customize-table"
    >
      <template #item-operation="item"><v-btn @click="updateDevice(item.id)">Update</v-btn></template>
    </EasyDataTable>
  </v-main>
</template>

<style scoped>
header {
  background-color: #383838;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

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
