<template>
<div>
    <Navbar />
    <div class="button-container">
        <router-link to="/addproduct" class="btn">Add Product</router-link>
        <input type="search" v-model="search_product" placeholder="Product Name" class="search-input">
        <button @click="search" class="btn">Search</button>
    </div>

    <table>
        <thead>
            <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product category</th>
                <th>Delete Product</th>
                <th>Update Product</th>
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
                    <button class="delete-button" @click="deleteProduct(item.id)">Delete</button>
                </td>
                <td>
                    <button class="update-button" @click="updateProduct(item.id)">Update</button>
                </td>

            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import Navbar from '@/components/UserDashboard/Navbar.vue';
import {
    useAuthStore
} from '@/stores/authStore'; // Import the Pinia store
// import axios from "axios";
import axios from '@/API/axios';

export default {
    name: 'Product',

    components: {
        Navbar,
    },

    data() {
        return {
            list: [],
            search_product: '',
        };
    },

     async mounted() {
        try {
            const token = useAuthStore().getLoginToken();

            const response = await axios.get(
                "/show_product", {
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
    },

    methods: {
        async search() {
            try {
                const token = useAuthStore().getLoginToken();

                const response = await axios.get(
                    "http://localhost:8000/api/search_product", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            search: this.search_product // Pass the search query as a query parameter
                        }
                    }
                );

                this.list = response.data.data; // Assign response.data to this.list
                console.warn('result', response);
            } catch (error) {
                console.error('Error In Fetching Product Data:', error);
            }
        },

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
                this.$router.push({
                    name: 'ShowProduct'
                });

                console.warn('Product deleted successfully', response);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        },

        async updateProduct(id) {
            try {
                const token = useAuthStore().getLoginToken();

                const response = await axios.get(`http://localhost:8000/api/fatch_product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Redirect to update page with query parameter
                this.$router.push({
                    name: 'UpdateProduct',
                    query: {
                        productData: JSON.stringify(response.data.data) // Serialize the product data as JSON string
                    }
                });

                console.warn('Product Fetched successfully', response);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        },
    },
   

}
</script>

<style>
a {
    text-decoration: none;
}

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

.button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.search-input {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
}

.btn {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
}

.btn:hover {
    background-color: #0056b3;
}

.delete-button,
.update-button {
    background-color: #f44336;
    /* Red background color */
    color: white;
    /* White text color */
    border: none;
    /* Remove border */
    padding: 8px 16px;
    /* Add padding */
    cursor: pointer;
    /* Add cursor pointer */
    border-radius: 4px;
    /* Add border radius */
}

.update-button {
    background-color: #4caf50;
}

.update-button:hover {
    background-color: #388e3c;
}

.delete-button:hover {
    background-color: #d32f2f;
    /* Darker red background color on hover */
}
</style>
