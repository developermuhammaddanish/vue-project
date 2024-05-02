<template>
<Navbar />
<button>
    <router-link to="/addcategory">Add Category</router-link>
</button>

<table>
    <thead>
        <tr>
            <th>Category Id</th>
            <th>Category Name</th>
            <th>Delete Category</th>
            <th>Update Category</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in list" :key="item">
            <td>
                {{item.id}}
            </td>
            <td>
                {{item.product_category}}
            </td>
            <td>
                <button @click="deleteProduct(item.id)">Delete</button>
            </td>
            <td>
                <button @click="updateCategory(item.id)">Update</button>
            </td>
        </tr>
    </tbody>
</table>
<p>
</p>
</template>

<script>
import Navbar from '@/components/UserDashboard/Navbar.vue';
import {
    useAuthStore
} from '@/stores/authStore'; // Import the Pinia store
import axios from '@/API/axios';
export default {
    name: 'Category',

    components: {
        Navbar,
    },

    data() {
        return {
            list: [],
        };
    },

    methods: {
        async deleteProduct(id) {
            try {
                const token = useAuthStore().getLoginToken();

                const response = await axios.delete(`/delete_category/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Remove the deleted product from the list
                this.list = this.list.filter(item => item.id !== id);

                // Redirect to product page
                this.$router.push({
                    name: 'ShowCategories'
                });

                console.warn('Product deleted successfully', response);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        },

        async updateCategory(id) {
            try {
                const token = useAuthStore().getLoginToken();

                const response = await axios.get(`/fatch_category/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Redirect to update page with query parameter
                this.$router.push({
                    name: 'UpdateCategory',
                    query: {
                        categoryData: JSON.stringify(response.data.data) // Serialize the product data as JSON string
                    }
                });

                console.warn('Product Fetched successfully', response);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        },
    },
    async mounted() {
        try {
            const token = useAuthStore().getLoginToken();

            const response = await axios.get(
                "/show_category", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            this.list = response.data; // Assign response.data to this.list
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
