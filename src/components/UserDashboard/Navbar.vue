<template>
<nav class="navbar">
    <div class="container">
        <div class="logo">
            <ul class="nav-list">
                <li>
                    <router-link to="/userdashboard">Logo</router-link>
                </li>
            </ul>
        </div>

        <div class="menu">
            <ul class="nav-list">
                <li>
                    <router-link to="/userdashboard">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/products">Products</router-link>
                </li>
                 <li>
                    <router-link to="/categories">Categories</router-link>
                </li>
            </ul>
        </div>
        <div class="logout">
            <p>{{userName}}</p>
            <button @click="logout" >Logout</button>
        </div>
    </div>
</nav>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore'; // Import the Pinia store
import { useRouter } from 'vue-router';
export default {
    name: 'Navbar',

     data() {
        return {
            userName: '',
        }
    },

    async mounted() {
        try {
            const user = useAuthStore().getUser();
            this.userName = user.name;
            console.log('result', user);
        } catch (error) {
            console.error('Error:', error);
        }
    },

    // props:{
    //     data:String,
    // },

     methods: {
        async logout() {
        try {
        const token = useAuthStore().getLoginToken();

       const response = await axios.post(
                    "http://localhost:8000/api/logout", 
                    null, // Set the request body to null since logout typically doesn't require data
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


        // Clear Store Token
        useAuthStore().clearLoginToken();
        useAuthStore().clearUser();

        // Redirect to product page
        this.$router.push({ name: 'Home' });

        console.warn('result', response);
      } catch (error) {
        console.error('Error In Logout:', error);
      }
    }
    }


}
</script>

<style>
.navbar {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.container .logo {
    color: red;
}

.nav-list {
    list-style: none;
    padding: 0;
    display: flex;
}

.nav-list li {
    margin: 0 10px;
}

.nav-list li a {
    color: #fff;
    text-decoration: none;
}

.nav-list li a:hover {
    color: #ccc;
}
.logout{
    display:flex;
}
.logout p{
    margin-right: 10px;
}
</style>
