<template>
  <div class="container mx-auto p-4 z-10">
    <h1 class="text-2xl font-bold mb-4">Order History</h1>

    <!-- Filter Options -->
    <div class="mb-4 flex justify-end space-x-4">
      <button @click="setStatusFilter('1')"
        :class="selectedStatus === '1' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
        class="px-4 py-2 rounded-lg focus:outline-none w-32 text-center">
        {{ orderStatusEnum[1] }}
      </button>
      <button @click="setStatusFilter('2')"
        :class="selectedStatus === '2' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
        class="px-4 py-2 rounded-lg focus:outline-none w-32 text-center">
        {{ orderStatusEnum[2] }}
      </button>
      <button @click="setStatusFilter('3')"
        :class="selectedStatus === '3' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
        class="px-4 py-2 rounded-lg focus:outline-none w-32 text-center">
        {{ orderStatusEnum[3] }}
      </button>
      <button @click="setStatusFilter('')"
        :class="selectedStatus === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
        class="px-4 py-2 rounded-lg focus:outline-none w-32 text-center">
        All
      </button>
    </div>

    <!-- Order List with Headers -->
    <div class="bg-white shadow rounded-lg">
      <div class="grid grid-cols-5 gap-4 bg-gray-100 p-4 text-gray-700 font-semibold">
        <div>Customer Name</div>
        <div>Amount</div>
        <div>Date</div>
        <div>Status</div>
        <div class="text-right">Actions</div> <!-- Empty header for the Details button -->
      </div>
      <div v-for="order in filteredOrders" :key="order.id" class="grid grid-cols-5 gap-4 p-4 border-b">
        <div>{{ order.customer_name }}</div>
        <div>{{ order.total_price }}</div>
        <div>{{ order.created_at }}</div>
        <!-- Status Dropdown -->
        <div>
          <select v-model="order.status" @change="updateOrderStatus(order)">
            <option value="Placed">Placed</option>
            <option value="Shipped">Shipped</option>
          </select>
        </div>
        <div class="text-right">
          <button @click="showOrderDetails(order)" class="px-4 py-2 bg-blue-500 text-white rounded">Details</button>
        </div>
      </div>
    </div>

    <!-- Modal for Order Details -->
    <orderDetailPopUp v-if="showModal" :selectedOrder="selectedOrder" :showModal="showModal" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import orderDetailPopUp from '@/components/orderDetailPopUp.vue';

const orderData = ref({ orders: [] });
const selectedStatus = ref('');
const showModal = ref(false);
const selectedOrder = ref({});

// Function to fetch and update order status
async function updateOrderStatus(order) {
  try {
    const token = localStorage.getItem('vue-token');
    const response = await fetch(`http://localhost:8082/api/v1/orders/${order.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ status: order.status }),
    });

    if (response.ok) {
      console.log("Order status updated successfully");
    } else {
      console.error("Failed to update order status");
    }
  } catch (error) {
    console.error("Error updating order status:", error);
  }
}

// Enum mapping for order statuses
const orderStatusEnum = {
  1: 'Placed',
  2: 'Processing',
  3: 'Dispatched',
};

// Fetch order data from the API
async function fetchOrders() {
  try {
    const token = localStorage.getItem('vue-token');
    const response = await fetch('http://localhost:8082/api/v1/orders', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    orderData.value.orders = data.orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  }
}

// Fetch order details from the API when an order is clicked
async function fetchOrderDetails(orderId) {
  try {
    const token = localStorage.getItem('vue-token');
    const response = await fetch(`http://localhost:8082/api/v1/orders/detail/${orderId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    selectedOrder.value = data.order;
    showModal.value = true;
  } catch (error) {
    console.error('Failed to fetch order details:', error);
  }
}

// Function to handle the "Details" button click
function showOrderDetails(order) {
  fetchOrderDetails(order.order_id);
}

// Function to close the modal
function closeModal() {
  showModal.value = false;
}

// Computed property to filter orders based on status
const filteredOrders = computed(() => {
  return selectedStatus.value
    ? orderData.value.orders.filter(order => order.status === selectedStatus.value)
    : orderData.value.orders;
});

onMounted(fetchOrders);
</script>

<style scoped>
/* Add any scoped CSS styling here */
</style>
