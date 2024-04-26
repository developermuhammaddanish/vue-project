<template>
<div>
    <Navbar />
</div>
</template>

<script>
import {
    useAuthStore
} from '@/stores/authStore'; // Import the Pinia store
import Navbar from '@/components/UserDashboard/Navbar.vue';

export default {
    name: 'UserDashboard',
    components: {
        Navbar
    },

}
</script>
