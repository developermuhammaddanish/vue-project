<template>
  <div class="registration-form">
    <h1>Registration Form</h1>
    <input type="text" v-model="name" placeholder="Name"><br><br>
    <input type="email" v-model="email" placeholder="Email"><br><br>
    <input type="password" v-model="password" placeholder="Password"><br><br>
    <button @click="register">Submit</button>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import axios from '@/API/axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async register() {
      try {
        const response = await axios.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password
        });

        // Store token in Pinia store
        useAuthStore().setEmailToken(response.data.token);

        // Redirect to product page
        this.$router.push({ name: 'VerifyEmail' });

        console.warn('result', response);
        
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  }
}
</script>

<style scoped>
.registration-form {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.registration-form h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.registration-form input[type="text"],
.registration-form input[type="email"],
.registration-form input[type="password"] {
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.registration-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.registration-form button:hover {
  background-color: #0056b3;
}
</style>
