import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import ViewIdeas from '@/views/ViewIdeas.vue';
import ViewOrders from '@/views/ViewOrders.vue';
import ViewRecipes from '@/views/ViewRecipies.vue'; // Correct name if needed

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/ideas', name: 'GenerateIdea', component: ViewIdeas, props: true },
  { path: '/recipes/:id', name: 'ViewRecipes', component: ViewRecipes }, // Ensure this is correct
  { path: '/orders', name: 'ViewOrders', component: ViewOrders }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
