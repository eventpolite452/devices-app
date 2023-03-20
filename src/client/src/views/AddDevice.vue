<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const model = ref('');
const brand = ref('');
const os = ref('');

const router = useRouter();

const submitForm = async () => {
  const response = await fetch('/api/devices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model.value,
      brand: brand.value,
      os: os.value,
    }),
  });

  if (response.ok) {
    // Redirect to the home page on successful submission
    router.push('/');
  } else {
    // Handle errors
    console.error(
      'Error submitting form:',
      response.status,
      response.statusText,
    );
  }
};
</script>

<template>
    <v-main style="min-height: 300px">
      <v-container style="display: flex">
  <v-card style="width: 100%;">
    <v-card-title> Add Device </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <v-text-field name="model" v-model="model" label="Model" required></v-text-field>
        <v-text-field name="brand" v-model="brand" label="Brand" required></v-text-field>
        <v-text-field name="os" v-model="os" label="OS" required></v-text-field>
        <v-btn type="submit">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
      </v-container>
    </v-main>
</template>
