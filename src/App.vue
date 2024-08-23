<template>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="$logout">Logout</button>
  </template>
  
  <script>
  import HelloWorld from './components/HelloWorld.vue'
  import axios from 'axios';
  import { initKeycloak } from './Keycloak';
  
  export default {
    name: 'App',
    components: {
      HelloWorld
    },

    mounted() {
    initKeycloak.then((keycloak) => {
      
      const token = localStorage.getItem("vue-token");
      console.log('token is:', token);
      if (token) {
        axios.get('http://localhost:8082/api/v1/jwtToken', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('User check successful:', response.data);
        })
        .catch(error => {
          console.error('Error checking user:', error);
        });
      } else {
        console.error('No token found in localStorage');
      }
    }).catch(error => {
      console.error('Keycloak initialization failed:', error);
    });
  }
};
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
  