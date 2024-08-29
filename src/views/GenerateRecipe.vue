<template>
  <div class="container mx-auto p-6 md:p-12 bg-white rounded-lg shadow-lg h-auto md:h-[900px]">
    <header class="flex justify-between items-center mb-6">
      <!-- Header content -->
    </header>

    <!-- Main content area for centering the form -->
    <div class="flex justify-center items-center h-full">
      <form class="w-full max-w-2xl h-auto md:h-[755px] p-6 md:p-12 bg-gray-100 rounded-lg shadow-md">
        <h3 class="text-xl md:text-2xl font-bold text-blue-600 mb-4 md:mb-6">Idea Details</h3>
        <div class="mb-4 md:mb-6">
          <label for="ideaTitle" class="block text-sm font-semibold mb-1">Idea Title:</label>
          <input v-model="ideaForm.title" id="ideaTitle" type="text" disabled class="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div class="mb-4 md:mb-6">
          <label for="ideaDescription" class="block text-sm font-semibold mb-1">Description:</label>
          <textarea v-model="ideaForm.description" id="ideaDescription" disabled class="w-full p-2 border border-gray-300 rounded resize-y" />
        </div>

        <div class="mb-4 md:mb-6">
          <label for="customerName" class="block text-sm font-semibold mb-1">Customer Name:</label>
          <input v-model="ideaForm.customerName" id="customerName" type="text" disabled class="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div class="mb-4 md:mb-6">
          <label for="Intrests" class="block text-sm font-semibold mb-1">Intrests:</label>
          <input v-model="ideaForm.Intrests" id="Intrests" type="text" disabled class="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div class="mb-4 md:mb-6">
          <label for="DietaryRestrictions" class="block text-sm font-semibold mb-1">Dietary Restrictions:</label>
          <input v-model="ideaForm.DietaryRestrictions" id="DietaryRestrictions" type="text" disabled class="w-full p-2 border border-gray-300 rounded" />
        </div>

        <!-- Button to Show Recipe Form -->
        <button v-if="!showRecipeForm" type="button" @click="showPopup = true" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Generate Recipe</button>
      </form>
    </div>

     <!-- AI Pop Up -->
    <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" @click.self="showPopup = false">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-blue-600">Generate Recipe</h2>
          <button :disabled="clickCount >= maxClicks" type="button" @click="AIOnClick" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">AI</button>
         <p v-if="clickCount >= maxClicks" class="text-red-500">
      You have reached the maximum number of clicks.
    </p>
        </div>
        <form @submit.prevent="submitAIHelpForm" class="md:h-[650px] ">
          <!-- Form fields -->

          <div class="mb-4 md:mb-6">
            <label for="aiRecipeName" class="block text-sm font-semibold mb-1">Name:</label>
            <input v-model="aiForm.recipeName" id="aiRecipeName" type="text" required class="w-full p-2 border border-gray-300 rounded" :disabled="AiFormDisabled"/>
          </div>

          <div class="mb-4 md:mb-6">
            <label for="aiRecipeDescription" class="block text-sm font-semibold mb-1">Description:</label>
            <textarea v-model="aiForm.recipedescription" id="aiRecipeDescription" required class="w-full p-2 border border-gray-300 rounded resize-y" :disabled="AiFormDisabled"/>
          </div>

          <div class="mb-4 md:mb-6">
            <label for="aiPrice" class="block text-sm font-semibold mb-1">Price:</label>
            <input v-model.number="aiForm.recipeprice" id="aiPrice" type="number" step="0.01" min="1" required class="w-full p-2 border border-gray-300 rounded" :disabled="AiFormDisabled"/>
          </div>

          <div class="mb-4 md:mb-6">
            <label for="aiServingSize" class="block text-sm font-semibold mb-1">Serving Size:</label>
            <input v-model.number="aiForm.recipeservingSize" id="aiServingSize" type="number" min="1" required class="w-full p-2 border border-gray-300 rounded" :disabled="AiFormDisabled"/>
          </div>

          <div class="mb-4 md:mb-6">
            <label for="aiRecipeImages" class="block text-sm font-semibold mb-1">Images:</label>
            <div class="relative">
              <input @change="handleAIFileChange" id="aiRecipeImages" type="file" accept="image/*" multiple class="absolute inset-0 opacity-0 cursor-pointer" :disabled="AiFormDisabled"/>
              <label for="aiRecipeImages" class="block bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition">Choose Files</label>
            </div>

            <div class="mt-2 flex flex-wrap gap-2">
              <img v-for="(preview, index) in aiForm.imagePreviews" :key="index" :src="preview" alt="Image preview" class="w-32 h-auto border border-gray-300 rounded" />
            </div>
            <button v-if="showAIUpdateButton" type="submit" @click="AIupdateRecipe" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Update</button>
          </div>

          <div class="flex flex-col md:flex-row justify-between mt-4">
            <button v-if="AIshowSubmitButton" type="submit" @click="AIsaveRecipe" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Save </button>
            <button v-if="!AIshowUpdateDeleteButtons" type="submit" class="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">Save as Draft</button>
            <button v-if="AIshowUpdateDeleteButtons" type="button" @click="AIEditRecipe" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">Edit </button>
            <button v-if="AIshowUpdateDeleteButtons" type="button" @click="AIdeleteRecipe" class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">Delete </button>
            <button @click="showPopup = false" type="button" class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition ml-2">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';
onMounted(() => {
  retrieveIdeaDetailFormData();
});
const retrieveIdeaDetailFormData = () => {
  
  const fetchedData = {
    title: 'Cake',
    description: 'a birthday cake having the shape of butterfly',
    customerName: 'CUSTOMER-456',
    DietaryRestrictions:'i dont want yeast',
    Intrests:'cheesy'
  };

  // Update ideaForm with the fetched data
  ideaForm.value = fetchedData;
};
const AiFormDisabled = ref(false);
var clickCount= 0; // To keep track of the number of clicks
var maxClicks=3
const showAIUpdateButton=ref(false);
const AIshowSubmitButton=ref(false);
const AIshowUpdateDeleteButtons = ref(false);

//AI
const AIsaveRecipe = () => {
  console.log("AI save");
  // Reset form fields
  AIshowUpdateDeleteButtons.value = false;
  AIshowSubmitButton.value=false;
  AiFormDisabled.value=false;
  aiForm.value.recipeName = '';
  aiForm.value.recipedescription = '';
  aiForm.value.recipeprice = null;
  aiForm.value.recipeservingSize = null;
  aiForm.value.images = [];
  aiForm.value.imagePreviews = [];
  
};
const AIOnClick=()=>{
  if (clickCount < maxClicks) {
        clickCount += 1;}
  const AIRequest = {
  aititle:ideaForm.value.title,
  aidescription:ideaForm.value.description,
  aiintrests:ideaForm.value.Intrests,
  aidietaryRestrictions:ideaForm.value.DietaryRestrictions}
;
const storedToken = localStorage.getItem("vue-token");
    token.value = storedToken;
   if(storedToken)
   {
  try {
    axios.post('http://localhost:8082/generateContent',AIRequest, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${storedToken}`
    }} )
    .then((res)=>{
      
      console.log(res.data)
       aiForm.value.recipeName = res.data.recipeName || '';
        aiForm.value.recipedescription = res.data.recipedescription || '';
         aiForm.value.recipeservingSize = res.data.recipeName || '';
        aiForm.value.recipeservingSize = res.data.recipeservingSize || '';
      

    });
  } catch (error) {
    console.error('Error submitting AI Help form', error);
  }}
}
const AIupdateRecipe = () => {
  AiFormDisabled.value=true;
  AIshowSubmitButton.value=true;
  showAIUpdateButton.value=false;
  console.log("Update");
  // Logic to update the recipe
};
const AIEditRecipe = () => {
  AiFormDisabled.value=false;
  AIshowSubmitButton.value=false;
  showAIUpdateButton.value=true;
  console.log("Update");
  // Logic to update the recipe
};

const AIdeleteRecipe = () => {
  console.log("Delete");
  // Logic to delete the recipe
};
// Idea form data
const ideaForm = ref({
  title: '',
  description: '',
  customerName: '',
  DietaryRestrictions:'',
    Intrests:''
});


const aiForm = ref({
  recipeName: '',
  recipedescription: '',
  recipeprice: null,
  recipeservingSize: null,
  images: [],
  imagePreviews: []
});

const showPopup = ref(false);
const showRecipeForm = ref(false);


const handleAIFileChange = (event) => {
  const files = Array.from(event.target.files);
  aiForm.value.images = files;

  aiForm.value.imagePreviews = files.map(file => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  });

  Promise.all(aiForm.value.imagePreviews).then(previews => {
    aiForm.value.imagePreviews = previews;
  });
};


const token = ref(null);
const submitAIHelpForm = async () => {
  if (aiForm.value.images.length === 0) {
    alert('Please select at least one image.');
    return;
  }

  const formData = new FormData();
  formData.append('name', aiForm.value.recipeName);
  formData.append('description', aiForm.value.recipedescription);
  formData.append('price', aiForm.value.recipeprice);
  formData.append('serving_size', aiForm.value.recipeservingSize);

  for (const image of aiForm.value.images) {
    formData.append('images', image);
  }

  try {
    const storedToken = localStorage.getItem("vue-token");
    token.value = storedToken;
   if(storedToken)
   {
    const response = await axios.post('http://localhost:8082/api/v1/ideas/1/recipes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${storedToken}`
      }
    }).then((res)=>{
      if(res.status==201)
    {
      AIshowUpdateDeleteButtons.value = true;
      AIshowSubmitButton.value=true;
      AiFormDisabled.value = true;
    }
      console.log("Hello",res.status)
    });}
  } catch (error) {
    console.error('Error submitting AI Help form', error);
  }
};

</script>

<style >

</style>