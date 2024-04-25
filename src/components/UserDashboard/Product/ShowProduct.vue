<template>
<Navbar/>
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
        </tr>
    </tbody>
</table>
<p>
</p>
</template>

<script>
import Navbar from '@/components/UserDashboard/Navbar.vue';
import axios from "axios";

export default {
    name: 'Product',
    components:{
        Navbar,
    },
    data() {
        return {
            list: [],
        };
    },

    async mounted() {
        let result = await axios.get("http://localhost:8000/api/show_product");
        console.warn('Show Product Api', result.data.data);
        this.list = result.data.data;
    }
}
</script>

<style>
button{
    margin:10px 0;
}
button a{
    text-decoration:none;
    color:black;
}
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd; /* Border color */
}

/* Style for table header */
th {
  background-color: #f2f2f2; /* Background color */
  border: 1px solid #ddd; /* Border color */
  padding: 8px; /* Padding */
  text-align: left; /* Align text to left */
}

/* Style for table data */
td {
  border: 1px solid #ddd; /* Border color */
  padding: 8px; /* Padding */
}

/* Style for even rows */
tr:nth-child(even) {
  background-color: #f2f2f2; /* Background color */
}
</style>
