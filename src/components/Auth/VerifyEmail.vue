<template>
 <div class="email-verification-form">
    <h1>Email Verification</h1>
    <input type="text" v-model="otp" placeholder="Enter OTP"><br><br>
    <button @click="verifyEmail">Verify Email</button>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'EmailVerification',
  data() {
    return {
      otp: '',
    }
  },
  methods: {
    async verifyEmail() {
      try {
        const token = useAuthStore().getEmailToken();

        const response = await axios.post("http://localhost:8000/api/verify-email", {
          otp: this.otp,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        //Clear Store Token
        useAuthStore().clearEmailToken();

        // Redirect to product page
        this.$router.push({ name: 'Login' });

        console.warn('result', response);
        // Handle email verification success
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    }
  }
}
</script>

<style scoped>
.email-verification-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.email-verification-form h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.email-verification-form input[type="text"] {
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.email-verification-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.email-verification-form button:hover {
  background-color: #0056b3;
}
</style>
