<template>
  <div>
    <DefaultLayout v-if="userProfileExists === true" />
    <UserProfile v-else />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { initKeycloak } from './Keycloak';
import DefaultLayout from './layouts/DefaultLayout.vue';
import UserProfile from './views/UserProfile.vue';
import { useRouter } from 'vue-router';

const token = ref(null);
const username = ref(null);
const userProfileExists = ref(null);
const router = useRouter();

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

        const responseUsername = response.data.username;
        if (responseUsername) {
          localStorage.setItem("username", responseUsername);
          username.value = responseUsername;

          const userCheckResponse = await axios.get(`http://localhost:8082/api/v1/users/${responseUsername}`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          userProfileExists.value = userCheckResponse.data._user_profile_completed;
        }
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
}
</style>
