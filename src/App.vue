<template>
  <DefaultLayout />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { initKeycloak } from './Keycloak';
import DefaultLayout from './layouts/DefaultLayout.vue';

const token = ref(null);

onMounted(async () => {
  try {
    const keycloak = await initKeycloak;

    const storedToken = localStorage.getItem("vue-token");
    token.value = storedToken;

    if (storedToken) {
      try {
        const response = await axios.get('http://localhost:8082/api/v1/jwtToken', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
      } catch (error) {
        console.error('Error checking user:', error);
      }
    } else {
      console.error('No token found in localStorage');
    }
  } catch (error) {
    console.error('Keycloak initialization failed:', error);
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>