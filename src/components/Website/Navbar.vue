<template>
<nav class="navbar">
    <div class="container">
    <div class="logo"><ul class="nav-list"><li><router-link to="/">Logo</router-link></li></ul></div>

    <div class="menu">
        <ul class="nav-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/">About</router-link></li>
            <li><router-link to="/">Contact</router-link></li>
        </ul>
    </div>
    <div class="login">
        <ul class="nav-list">
             <li><router-link to="/register">Register</router-link></li>
             <li><router-link to="/login">Login</router-link></li>
        </ul>  
    </div>

        
    </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>
.navbar {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.container .logo{
    color:red;
}
.nav-list {
    list-style: none;
    padding: 0;
    display: flex;
}

.nav-list li {
    margin: 0 10px;
}

.nav-list li a {
    color: #fff;
    text-decoration: none;
}

.nav-list li a:hover {
    color: #ccc;
}
</style>
