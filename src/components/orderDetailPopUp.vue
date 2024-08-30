<template>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <div class="flex justify-between items-center border-b pb-4">
          <h3 class="text-xl font-semibold">Order Details</h3>
          <button @click="closeModal" class="text-gray-600 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
  
        <div class="mt-4 grid grid-cols-2 gap-4">
          <!-- Order Information -->
          <div class="border p-4 rounded-lg shadow-sm">
            <p><strong>Total Amount:</strong> {{ selectedOrder.total_price }} USD</p>
            <p><strong>Customer Name:</strong> {{ selectedOrder.customer_name }}</p>
            <p><strong>Customer Contact Number:</strong> {{ selectedOrder.customer_contact_number }}</p>
          </div>
          <!-- Shipping Information -->
          <div class="border p-4 rounded-lg shadow-sm">
            <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
            <p><strong>Delivery Address:</strong> {{ selectedOrder.address.street }}, {{ selectedOrder.address.city }}</p>
            <p><strong>Order Date:</strong> {{ new Date(selectedOrder.created_at).toLocaleDateString() }}</p>
          </div>
        </div>
  
        <!-- Order Items -->
        <h4 class="font-semibold mt-6">Order Items</h4>
        <div class="border-t mt-2 pt-2">
          <table class="min-w-full bg-gray-100 text-gray-700">
            <thead class="bg-gray-200">
            <tr>
              <th class="p-4 ">Recipe Name</th>
              <th class="p-4 text-center">Quantity</th>
              <th class="p-4 text-center">Price</th>
              <th class="p-4 text-center">Serving Size</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in selectedOrder.order_items" :key="item.recipe_name" class="border-b">
              <td class="p-4 text-center">{{ item.recipe_name }}</td>
              <td class="p-4 text-center">{{ item.quantity }}</td>
              <td class="p-4 text-center">{{ item.price }} USD</td>
              <td class="p-4 text-center">{{ item.serving_size }}</td>
            </tr>
            </tbody>
          </table>
        </div>
  
        <div class="flex justify-end mt-4">
          <button @click="closeModal" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    selectedOrder: {
      type: Object,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true,
    },
  });
  
  const emits = defineEmits(['close']);
  
  function closeModal() {
    emits('close');
  }
  </script>
  