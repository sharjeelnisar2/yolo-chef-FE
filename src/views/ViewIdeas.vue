<template>
  <div class="container mx-auto p-6">
    
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else>
     <div class="mb-6 flex justify-end">
  <input 
  v-model="filterTitle" 
  type="text" 
  placeholder="Filter by title..." 
  class="border border-gray-300 rounded-lg px-4 py-2 w-64"
  @change="getIdeasWithFilter(filterTitle.toString)"
/>

</div>

      <div>
        <!-- Titles Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 text-gray-700 font-semibold mb-4 rounded-lg shadow-md">
          <div class="p-3 border-b border-gray-300">Customer Name</div>
          <div class="p-3 border-b border-gray-300">Title</div>
          <div class="p-3 border-b border-gray-300">Created At</div>
          <div class="p-3 border-b border-gray-300">Actions</div>
        </div>
        <!-- Cards for Each Idea -->
        <div v-for="idea in ideas" :key="idea.id" class="bg-white rounded-lg shadow-lg mb-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b border-gray-200">
            <div class="text-gray-800">{{ idea.customerName }}</div>
            <div class="text-gray-800">{{ idea.title }}</div>
            <div class="text-gray-500">{{ formatDate(idea.createdAt) }}</div>
            <div class="flex justify-center md:justify-start">
              <button 
                @click="viewIdea(idea.id)" 
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const ideas = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/v1/ideas');
    ideas.value = response.data.ideas;
  } catch (error) {
    console.error('Error fetching ideas:', error);
  } finally {
    loading.value = false;
  }
});

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function viewIdea(id) {
  router.push({
    name: 'ViewRecipes',
    params: { id }
  }).catch(err => {
    console.error('Navigation error:', err);
  });
}

const filterTitle = ref('');

async function getIdeasWithFilter(title) {
  try {
    console.log("ebtfb")
    const response = await axios.get('http://localhost:8081/api/v1/ideas', {
      params: { title }
    });
    ideas.value = response.data.ideas;
  } catch (error) {
    console.error('Error fetching filtered ideas:', error);
  }
}
</script>
