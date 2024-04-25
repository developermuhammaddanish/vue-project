import { createWebHistory, createRouter } from 'vue-router';
import PageNotFound from './components/PageNotFound.vue';
import Home from './components/Website/Home.vue';
import Register from './components/Auth/Register.vue';
import VerifyEmail from './components/Auth/VerifyEmail.vue';
import Login from './components/Auth/Login.vue';
import UserDashboard from './components/UserDashboard/UserDashboard.vue';
import ShowProduct from './components/UserDashboard/Product/ShowProduct.vue';
import AddProduct from './components/UserDashboard/Product/AddProduct.vue';

import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Home',
            path: '/',
            component: Home
        },
        {
            name: 'ShowProduct',
            path: '/products',
            component: ShowProduct,
            meta: { requiresAuth: true } // Protected route
        },
        {
            name: 'PageNotFound',
            path: '/:pathMatch(.*)*',
            component: PageNotFound
        },
        {
            name: 'AddProduct',
            path: '/addproduct',
            component: AddProduct,
            meta: { requiresAuth: true } // Protected route
        },
        {
            name: 'Register',
            path: '/register',
            component: Register
        },
        {
            name: 'Login',
            path: '/login',
            component: Login
        },
        {
            name: 'VerifyEmail',
            path: '/verifyemail',
            component: VerifyEmail
        },
        {
            name: 'UserDashboard',
            path: '/userdashboard',
            component: UserDashboard,
            meta: { requiresAuth: true } // Protected route
        }
    ]
});


// Navigation guard to check authentication status
router.beforeEach((to, from, next) => {
    const isAuthenticated = useAuthStore().isLoggedIn();
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' });
    } else if (isAuthenticated && to.name !== 'UserDashboard' && to.name !== 'ShowProduct' && to.name !== 'AddProduct') {
        next({ name: 'UserDashboard' });
    } else if (isAuthenticated && (to.name === 'ShowProduct' || to.name === 'AddProduct')) {
        next();
    } else {
        next();
    }
});



export default router;
