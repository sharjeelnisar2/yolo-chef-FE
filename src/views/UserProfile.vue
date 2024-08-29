<template>
    <h1>UserProfile1</h1>
    <h1>UserProfile2</h1>
    <!-- <div class="registration">
      <div class="container">
        <div v-if="isMdUp" class="image-container">
          <img src="../assets/LoginImage.jpg" alt="login" class="login-image" />
        </div>
        <div class="form-container">
          <h1 class="title">SignUp Here!</h1>
          <form @submit.prevent="handleSubmit">
            <div class="field-group">
              <v-text-field
                v-model="formData.name"
                :label="errors.name || 'Name'"
                :error-messages="errors.name"
                outlined
                required
              />
              <v-text-field
                v-model="formData.username"
                label="Username"
                outlined
                required
              />
            </div>
            <div class="field-group">
              <v-text-field
                v-model="formData.email"
                :label="errors.email || 'Email'"
                :error-messages="errors.email"
                outlined
                required
              />
              <v-text-field
                v-model="formData.cnic"
                :label="errors.cnic || 'Cnic'"
                :error-messages="errors.cnic"
                outlined
                required
              />
            </div>
            <v-select
              v-model="formData.accountType"
              :items="accountTypes"
              label="Account Type"
              outlined
              required
            />
            <v-text-field
              v-model="formData.password"
              :label="errors.password || 'Password'"
              :error-messages="errors.password"
              type="password"
              outlined
              required
            />
            <v-text-field
              v-model="formData.phoneNumber"
              :label="errors.phoneNumber || 'Phone'"
              :error-messages="errors.phoneNumber"
              outlined
              required
            />
            <v-textarea
              v-model="formData.address"
              label="Address"
              outlined
              rows="4"
            />
            <v-btn type="submit" color="red" class="submit-button">Send Sign Up Request</v-btn>
            <v-divider></v-divider>
            <p class="login-link">
              Already have an account?
              <v-btn @click="goToLogin" color="red">Login</v-btn>
            </p>
          </form>
        </div>
      </div>
    </div> -->
  </template>
  
  <script>
//   import axios from 'axios';
  
//   export default {
//     data() {
//       return {
//         formData: {
//           name: '',
//           username: '',
//           email: '',
//           cnic: '',
//           password: '',
//           phoneNumber: '',
//           address: '',
//           accountType: '',
//         },
//         errors: {
//           name: '',
//           email: '',
//           cnic: '',
//           password: '',
//           phoneNumber: '',
//         },
//         accountTypes: ['Saving', 'Current'],
//       };
//     },
//     computed: {
//       isMdUp() {
//         return window.innerWidth >= 960; // Adjust based on your needs
//       }
//     },
//     methods: {
//       validateForm() {
//         let valid = true;
//         this.errors = {
//           name: '',
//           email: '',
//           cnic: '',
//           password: '',
//           phoneNumber: '',
//         };
  
//         // Name validation
//         if (/\d/.test(this.formData.name)) {
//           this.errors.name = 'Invalid Name';
//           valid = false;
//         }
  
//         // Email validation
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(this.formData.email)) {
//           this.errors.email = 'Invalid Email Address';
//           valid = false;
//         }
  
//         // CNIC validation
//         const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
//         if (!cnicPattern.test(this.formData.cnic)) {
//           this.errors.cnic = 'Invalid CNIC';
//           valid = false;
//         }
  
//         // Password validation
//         if (this.formData.password.length < 8) {
//           this.errors.password = 'Password must be at least 8 characters long';
//           valid = false;
//         }
  
//         // PhoneNumber validation
//         if (/[a-zA-Z]/.test(this.formData.phoneNumber)) {
//           this.errors.phoneNumber = 'Phone number should not contain alphabets';
//           valid = false;
//         } else if (this.formData.phoneNumber.length < 10) {
//           this.errors.phoneNumber = 'Phone number must be at least 10 characters long';
//           valid = false;
//         }
  
//         return valid;
//       },
//       async handleSubmit() {
//         if (this.validateForm()) {
//           try {
//             const response = await axios.post(
//               'http://localhost:8080/v2/auth/request',
//               this.formData
//             );
  
//             if (response.status === 200) {
              
//               setTimeout(() => {
//                 this.$router.go(-1); // navigate back
//               }, 2000);
//             } else {
//               toast.error('Failed to send request');
//             }
//           } catch (error) {
//             const errorMessage = error.response?.data?.message || 'An error occurred';
//             toast.error(errorMessage);
//           }
//         }
//       },
//       goToLogin() {
//         this.$router.push('/login');
//       }
//     }
//   };
  </script>
  
  <style scoped>
  .container {
    display: flex;
  }
  .image-container {
    flex: 1;
  }
  .login-image {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
  .form-container {
    flex: 1;
    padding: 20px;
  }
  .title {
    text-align: center;
    font-weight: bold;
    font-size: 35px;
  }
  .field-group {
    display: flex;
    justify-content: space-between;
  }
  .submit-button {
    margin-top: 20px;
  }
  .login-link {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  