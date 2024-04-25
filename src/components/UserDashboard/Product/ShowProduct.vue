<template>
<Navbar />
<button>
    <router-link to="/addproduct">Add Product</router-link>
</button>

<table>
    <thead>
        <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product category</th>
            <th>Delete Product</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in list" :key="item">
            <td>
                {{item.id}}
            </td>
            <td>
                {{item.product_name}}
            </td>
            <td>
                {{item.product_price}}
            </td>
            <td>
                {{item.category.product_category}}
            </td>
            <td>
                <button @click="deleteProduct(item.id)">Delete</button>
            </td>
        </tr>
    </tbody>
</table>
<p>
</p>
</template>

<script>
import Navbar from '@/components/UserDashboard/Navbar.vue';
import { useAuthStore } from '@/stores/authStore'; // Import the Pinia store
import axios from "axios";

export default {
    name: 'Product',

    components: {
        Navbar,
    },
    
    data() {
        return {
            list: [],
        };
    },

   methods:{
    async deleteProduct(id) {
        try {
            const token = useAuthStore().getLoginToken();

            const response = await axios.delete(`http://localhost:8000/api/delete_product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

             // Remove the deleted product from the list
            this.list = this.list.filter(item => item.id !== id);

            // Redirect to product page
            this.$router.push({ name: 'ShowProduct' });
            console.warn('Product deleted successfully', response);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }   
},


    async mounted() {
        try {
            const token = useAuthStore().getLoginToken();

            const response = await axios.get(
                "http://localhost:8000/api/show_product",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            this.list = response.data.data; // Assign response.data to this.list
            console.warn('result', response);
        } catch (error) {
            console.error('Error In Fetching Product Data:', error);
        }
    }
}
</script>

<style>
button {
    margin: 10px 0;
}

button a {
    text-decoration: none;
    color: black;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    /* Border color */
}

/* Style for table header */
th {
    background-color: #f2f2f2;
    /* Background color */
    border: 1px solid #ddd;
    /* Border color */
    padding: 8px;
    /* Padding */
    text-align: left;
    /* Align text to left */
}

/* Style for table data */
td {
    border: 1px solid #ddd;
    /* Border color */
    padding: 8px;
    /* Padding */
}

/* Style for even rows */
tr:nth-child(even) {
    background-color: #f2f2f2;
    /* Background color */
}
</style>
