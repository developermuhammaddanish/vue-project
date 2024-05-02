import { createWebHistory, createRouter } from 'vue-router';
import PageNotFound from './components/PageNotFound.vue';
import Auth from './components/Auth.vue';
import Home from './views/website/Home.vue';

//Auth
import Register from './views/auth/Register.vue';
import VerifyEmail from './views/auth/VerifyEmail.vue';
import ForgotEmail from './views/auth/ForgotEmail.vue';
import Login from './views/auth/Login.vue';

//userpanel
import UserDashboard from './views/userpanel/UserDashboard.vue';

//product
import ShowProduct from './views/userpanel/products/ShowProduct.vue';
import AddProduct from './views/userpanel/products/AddProduct.vue';
import UpdateProduct from './views/userpanel/products/UpdateProduct.vue';

//category
import ShowCategories from './views/userpanel/categories/ShowCategories.vue';
import AddCategory from './views/userpanel/categories/AddCategory.vue';
import UpdateCategory from './views/userpanel/categories/UpdateCategory.vue';


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
            name: 'ForgotEmail',
            path: '/forgotemail',
            component: ForgotEmail
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
        {
            name: 'Auth',
            path: '/auth',
            component: Auth
        },
    ]
});


// Navigation guard to check authentication status
router.beforeEach((to, from, next) => {
    
    const isAuthenticated = useAuthStore().isLoggedIn();
    // console.log(isAuthenticated);
    
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
