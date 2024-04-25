<template>
    <div>

    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore'; // Import the Pinia store
import { useRouter } from 'vue-router';
   
   export default {
    
    name:'Logout',

    methods: {
        
        async logout() {
        try {
        const token = useAuthStore().getLoginToken();

        const response = await axios.post("http://localhost:8000/api/logout" , 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        useAuthStore().clearLoginToken();

        // Redirect to product page
        this.$router.push({ name: 'Home' });

        console.warn('result', response);
        // Handle email verification success
      } catch (error) {
        console.error('Error In Logout:', error);
      }
    }
    }

   }
</script>