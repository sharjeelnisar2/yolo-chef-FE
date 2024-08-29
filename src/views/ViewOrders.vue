<template>
  <div class="container mx-auto p-4">
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
            <option value="shipped">Shipped</option>
          </select>
        </div>
        <div class="text-right">
          <button @click="showOrderDetails(order)" class="px-4 py-2 bg-blue-500 text-white rounded">Details</button>
        </div>
      </div>
    </div>

    <!-- Modal for Order Details -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <div class="flex justify-between items-center border-b pb-4">
          <h3 class="text-xl font-semibold">Order Details</h3>
          <button @click="closeModal" class="text-gray-600 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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
            <p><strong>Delivery Address:</strong> {{ selectedOrder.address.street }}, {{
              selectedOrder.address.city }}</p>
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

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const orderData = ref({ orders: [] });
const selectedStatus = ref('');
const showModal = ref(false);
const selectedOrder = ref({});  // Correctly initialized as a ref

async function updateOrderStatus(order) {
  try {
    const token = localStorage.getItem('vue-token');
    alert(token);
    const response = await fetch(`http://localhost:8082/api/v1/orders/${order.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `"Bearer"+${token}`
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
    const response = await fetch('http://localhost:8082/api/v1/orders/1', {
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

// Fetch order items from the API when an order is clicked
async function fetchOrderDetails(orderId) {
  try {
    const token = localStorage.getItem('vue-token');
    const response = await fetch(`http://localhost:8082/api/v1/orders/detail/${orderId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch order items');
    }
    const data = await response.json();
    selectedOrder.value = data.order;  // Correctly assign the value
  } catch (error) {
    console.error('Failed to fetch order items:', error);
  }
}

// Filter orders based on selected status
const filteredOrders = computed(() => {
  if (!selectedStatus.value) {
    return orderData.value.orders;
  }
  return orderData.value.orders.filter(
    (order) => order.status === selectedStatus.value
  );
});

// Set selected status for filtering
function setStatusFilter(status) {
  selectedStatus.value = status;
}

// Show order details in the modal and fetch order items
function showOrderDetails(order) {
  showModal.value = true;
  fetchOrderDetails(order.order_id);  // Fetch order details by ID
}

// Close the modal
function closeModal() {
  showModal.value = false;
  selectedOrder.value = {};  // Clear selected order on modal close
}

// Fetch orders on component mount
onMounted(() => {
  fetchOrders();
});
</script>
