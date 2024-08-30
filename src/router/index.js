import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import ViewIdeas from '@/views/ViewIdeas.vue';
import ViewOrders from '@/views/ViewOrders.vue';
import ViewRecipies from '@/views/ViewRecipies.vue';
import UserProfile from '@/views/UserProfile.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/ideas', name: 'GenerateIdea', component: ViewIdeas },
  { path: '/recipies', name: 'ViewIdeas', component: ViewRecipies },
  { path: '/orders', name: 'ViewOrders', component: ViewOrders },
  { path: '/userprofile', name: 'UserProfile', component: UserProfile },
  // { path: '/defaultlayout', name: 'DefaultLayout', component: DefaultLayout },
];  

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;