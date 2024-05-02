<template>
<Navbar />

<div class="add-product-form">
    <h1>Add Product</h1>
    <form @submit.prevent="addData">
        <input type="text" v-model="product_name" placeholder="Product Name"><br><br>
        <input type="text" v-model="product_price" placeholder="Product Price"><br><br>
        <select v-model="category_id" placeholder="Category">
            <option value="" disabled selected>Select Category</option>
            <option value="1">Food</option>
            <option value="2">Electronic</option>
            <option value="5">Beauty</option>
        </select><br><br>
        <button type="submit">Submit</button>
    </form>
</div>

</template>

<script>
import axios from '@/API/axios';
import Navbar from '@/components/UserDashboard/Navbar.vue';
import { useAuthStore } from '@/stores/authStore'; // Import the Pinia store
import { useRouter } from 'vue-router';

export default {
    name: 'Form',
    components: {
        Navbar
    },
    data() {
        return {
            product_name: '',
            product_price: '',
            category_id: '',
        }
    },

    methods: {

        async addData() {

                const token = useAuthStore().getLoginToken();

                const response = await axios.post("/add_product",
                    {
                        product_name: this.product_name,
                        product_price: this.product_price,
                        category_id: this.category_id
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                    // Redirect to product page
                    this.$router.push({ name: 'ShowProduct' });
                    console.warn('Product added successfully', response);
        }   
    }
}
</script>


<style>
.add-product-form {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.add-product-form h1 {
  text-align: center;
  margin-bottom: 20px;
}

.add-product-form input,
.add-product-form select,
.add-product-form button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-product-form button {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.add-product-form button:hover {
  background-color: #45a049;
}
</style>

