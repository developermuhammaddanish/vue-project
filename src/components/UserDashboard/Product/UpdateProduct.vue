<template>
<Navbar />

<div class="add-product-form">
    <h1>Update Product</h1>
    <input type="text" v-model="product_name" placeholder="Product Name"><br><br>
    <input type="text" v-model="product_price" placeholder="Product Price"><br><br>
    <input type="text" v-model="category_id" placeholder="Category Id"><br><br>
    <button @click="updateProduct()">Submit</button>
</div>
</template>

<script>
import axios from 'axios';
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
           product_name: this.$route.params.productData.product_name,
           product_price: this.$route.params.productData.product_price,
           category_id: this.$route.params.productData.category_id
        }
    },

    methods: {

        async updateProduct(id) {

                const token = useAuthStore().getLoginToken();

                const response = await axios.post(`http://localhost:8000/api/update_product/${id}`,
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
                    console.warn('Product Update successfully', response);
        }   
    }
}
</script>


<style scoped>
.add-product-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.add-product-form h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

.add-product-form input[type="text"] {
    width: 95%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.add-product-form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.add-product-form button:hover {
    background-color: #0056b3;
}
</style>
