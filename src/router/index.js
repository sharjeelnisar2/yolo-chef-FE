import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import ViewIdeas from '@/views/ViewIdeas.vue';
import ViewOrders from '@/views/ViewOrders.vue';
import ViewRecipies from '@/views/ViewRecipies.vue';
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/ideas', name: 'GenerateIdea', component: ViewIdeas },
  { path: '/recipies', name: 'ViewIdeas', component: ViewRecipies },
  { path: '/orders', name: 'ViewOrders', component: ViewOrders }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
