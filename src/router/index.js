import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import GenerateIdea from "@/views/GenerateIdea.vue";
import ViewIdeas from "@/views/ViewIdeas.vue";
import ViewOrders from "@/views/ViewOrders.vue";
import ViewRecipesList from "@/views/ViewRecipesList.vue";
import ViewRecipeDetails from "@/views/ViewRecipeDetails.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/ideas", name: "GenerateIdea", component: GenerateIdea },
  { path: "/recipes", name: "ViewRecipesList", component: ViewRecipesList },
  {
    path: "/recipe-details",
    name: "ViewRecipeDetails",
    component: ViewRecipeDetails,
  },
  { path: "/view-orders", name: "ViewOrders", component: ViewOrders },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
