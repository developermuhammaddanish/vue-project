<template>
<Navbar />

<div class="add-product-form">
    <h1>Update Product</h1>
    <input type="text" v-model="product_name" placeholder="Product Name"><br><br>
    <input type="text" v-model="product_price" placeholder="Product Price"><br><br>
    <select v-model="category_id">
        <option value="" disabled>Select Category</option>
        <option value="1" :selected="category_id === '1'">Electronic</option>
        <option value="2" :selected="category_id === '2'">Food</option>
        <option value="5" :selected="category_id === '5'">Beauty</option>
    </select><br><br>
    <button @click="updateProduct(product_id)">Submit</button>
</div>
</template>

<script>
import axios from '@/API/axios';
import Navbar from '@/components/UserDashboard/Navbar.vue';
import {
    useAuthStore
} from '@/stores/authStore'; // Import the Pinia store
import {
    useRouter
} from 'vue-router';

export default {
    name: 'Form',
    components: {
        Navbar
    },

    data() {
        return {
            product_id: '',
            product_name: '',
            product_price: '',
            category_id: ''
        }
    },

    mounted() {
        const productData = this.$route.query.productData;
        if (productData) {
            this.productData = JSON.parse(productData); // Parse JSON string to object
            this.product_id = this.productData.id;
            this.product_name = this.productData.product_name;
            this.product_price = this.productData.product_price;
            this.category_id = this.productData.category_id;
        }
    },

    methods: {

        async updateProduct(id) {

            const token = useAuthStore().getLoginToken();

            const response = await axios.post(`/update_product/${id}`, {
                product_name: this.product_name,
                product_price: this.product_price,
                category_id: this.category_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Redirect to product page
            this.$router.push({
                name: 'ShowProduct'
            });
            console.warn('Product Update successfully', response);
        }
    }
}
</script>

<style scoped>
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
