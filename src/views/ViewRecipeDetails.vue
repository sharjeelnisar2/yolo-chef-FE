<script setup>
const recipe = {
  name: 'Spaghetti Carbonara',
  description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
  servingSize: 2,
  price: '$12',
  ideaTitle: 'Perfect for a cozy dinner',
  status: 'Available',
  createdAt: '2024-08-28',
  image: 'https://via.placeholder.com/150' // Replace with your dummy image URL
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">View Recipe Details Page</h1>
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img :src="recipe.image" alt="Recipe Image" class="w-full h-48 object-cover" />
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-2">{{ recipe.name }}</h2>
        <p class="text-gray-600 mb-4">{{ recipe.description }}</p>
        <div class="flex flex-col md:flex-row md:justify-between">
          <p class="text-gray-600"><strong>Serving Size:</strong> {{ recipe.servingSize }}</p>
          <p class="text-gray-600"><strong>Price:</strong> {{ recipe.price }}</p>
        </div>
        <p class="text-gray-600 mt-4"><strong>Idea Title:</strong> {{ recipe.ideaTitle }}</p>
        <p class="text-gray-600"><strong>Status:</strong> {{ recipe.status }}</p>
        <p class="text-gray-600"><strong>Created At:</strong> {{ recipe.createdAt }}</p>
      </div>
    </div>
  </div>
</template>
