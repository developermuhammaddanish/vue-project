<template>
  <div class="login-form">
    <h1>Login Form</h1>
    <input type="email" v-model="email" placeholder="Email"><br><br>
    <input type="password" v-model="password" placeholder="Password"><br><br>
    <button @click="login">Submit</button>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore'; // Import the Pinia store
import { useRouter } from 'vue-router';

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: ''
    };
  },

  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8000/api/login", {
          email: this.email,
          password: this.password
        });

        // Store token in Pinia store
        useAuthStore().setLoginToken(response.data.token);
        useAuthStore().setUser(response.data.user.name);

        // Redirect to the dashboard
        this.$router.push({ name: 'UserDashboard' });

        console.warn('result', response);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form input[type="email"],
.login-form input[type="password"] {
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}
</style>
