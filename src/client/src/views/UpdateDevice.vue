<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const getDevice = async () => {
  const response = await fetch(`/api/devices/${route.query.id}`);
  const deviceData = await response.json();
  device.value = deviceData;
};
const modelRules = [(v: string) => !!v || 'Model is required'];

const brandRules = [(v: string) => !!v || 'Brand is required'];

const osRules = [(v: string) => !!v || 'OS is required'];

const valid = ref(false);

const device = ref({
  model: '',
  brand: '',
  os: '',
});

const submitForm = async () => {
  const response = await fetch(`/api/devices/${route.query.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(device.value),
  });

  if (response.ok) {
    router.push('/');
  } else {
    console.error(`Failed to update device: ${response.status}`);
  }
};

getDevice();
</script>

<template>
  <v-main style="min-height: 300px">
    <v-container style="display: flex">
      <v-card style="width: 100%">
        <v-card-title> Add Device </v-card-title>
        <v-card-text>
          <v-form v-model="valid" @submit.prevent="submitForm">
            <v-text-field
              v-model="device.model"
              :rules="modelRules"
              label="Model"
              required
            ></v-text-field>
            <v-text-field
              v-model="device.brand"
              :rules="brandRules"
              label="Brand"
              required
            ></v-text-field>
            <v-text-field
              v-model="device.os"
              :rules="osRules"
              label="OS"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!valid" color="primary"
              >Submit</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>
