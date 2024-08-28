
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'
import 'primeicons/primeicons.css'
import { keycloak, initKeycloak } from './Keycloak';

initKeycloak.then(() => {
    const app = createApp(App);
    app.use(router);
    app.config.globalProperties.$keycloak = keycloak;
    app.config.globalProperties.$logout = () => {
        keycloak.logout();
    };

    app.mount('#app');
}).catch(error => {
    console.error(error);
});
