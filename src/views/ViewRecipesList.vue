<script setup>
import { ref } from "vue";

const recipes = ref([
  {
    id: 1,
    name: "Spaghetti Carbonara",
    price: "$12",
    servings: 2,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Chicken Alfredo",
    price: "$15",
    servings: 3,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Beef Stroganoff",
    price: "$18",
    servings: 4,
    image: "https://via.placeholder.com/100",
  },
]);

const viewDetails = (recipe) => {
  console.log(`Viewing details for ${recipe.name}`);
  // Add your logic for viewing details here
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">View Recipes List Page</h1>
    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="flex items-center justify-between p-4 border rounded-md shadow-sm"
      >
        <div class="flex items-center space-x-5 md:space-x-10">
          <img
            :src="recipe.image"
            alt="Recipe Thumbnail"
            class="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover"
          />
          <div>
            <span class="text-sm font-semibold md:text-xl">{{
              recipe.name
            }}</span>
            <div class="text-gray-600 text-sm md:text-base">
              <p>Price: {{ recipe.price }}</p>
              <p>Servings: {{ recipe.servings }}</p>
            </div>
          </div>
        </div>
        <button
          @click="viewDetails(recipe)"
          class="bg-blue-600 text-white text-sm px-1.5 py-1 rounded-md hover:bg-blue-700 sm:px-4 sm:py-2 text-xl"
        >
          Details
        </button>
      </div>
    </div>
  </div>
</template>
