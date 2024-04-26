import { createWebHistory, createRouter } from 'vue-router';
import PageNotFound from './components/PageNotFound.vue';
import Home from './components/Website/Home.vue';

import Register from './components/Auth/Register.vue';
import VerifyEmail from './components/Auth/VerifyEmail.vue';
import Login from './components/Auth/Login.vue';
import UserDashboard from './components/UserDashboard/UserDashboard.vue';

import ShowProduct from './components/UserDashboard/Product/ShowProduct.vue';
import AddProduct from './components/UserDashboard/Product/AddProduct.vue';
import UpdateProduct from './components/UserDashboard/Product/UpdateProduct.vue';

import ShowCategories from './components/UserDashboard/Categories/ShowCategories.vue';
import AddCategory from './components/UserDashboard/Categories/AddCategory.vue';
import UpdateCategory from './components/UserDashboard/Categories/UpdateCategory.vue';


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
        },

        {
            name: 'ShowProduct',
            path: '/products',
            component: ShowProduct,
            meta: { requiresAuth: true } // Protected route
        },
        {
            name: 'ShowCategories',
            path: '/categories',
            component: ShowCategories,
            meta: { requiresAuth: true } // Protected route
        },
        {
            name: 'AddProduct',
            path: '/addproduct',
            component: AddProduct,
            meta: { requiresAuth: true } // Protected route
        },
        {
            name: 'AddCategory',
            path: '/addcategory',
            component: AddCategory,
            meta: { requiresAuth: true } // Protected route
        },
        {
            name: 'UpdateProduct',
            path: '/updateproduct',
            component: UpdateProduct,
            meta: { requiresAuth: true } // Protected route
        },
        {
            name: 'UpdateCategory',
            path: '/updatecategory',
            component: UpdateCategory,
            meta: { requiresAuth: true } // Protected route
        },
         {
            name: 'PageNotFound',
            path: '/:pathMatch(.*)*',
            component: PageNotFound
        },
    ]
});


// Navigation guard to check authentication status
router.beforeEach((to, from, next) => {
    const isAuthenticated = useAuthStore().isLoggedIn();
    console.log(isAuthenticated);
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' });
    } else if (isAuthenticated 
        && to.name !== 'UserDashboard'
        && to.name !== 'ShowProduct' 
        && to.name !== 'AddProduct' 
        && to.name !== 'UpdateProduct'
        && to.name !== 'ShowCategories'
        && to.name !== 'AddCategory'
        && to.name !== 'UpdateCategory') 
        {
        next({ name: 'UserDashboard' });
    } else if (isAuthenticated && (
        to.name === 'ShowProduct' || 
        to.name === 'AddProduct' || 
        to.name === 'UpdateProduct' ||
        to.name === 'AddCategory' ||
        to.name === 'ShowCategories' ||
        to.name === 'UpdateCategory')) 
        {
        next();
    } else {
        next();
    }
});
// console.log(localStorage.getItem("token"));

export default router;
