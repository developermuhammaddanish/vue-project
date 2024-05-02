<template>
<div class="email-verification-form">
    <h1>Please enter your email address to search for your account.</h1>
    <input type="text" v-model="email" placeholder="Email Adress"><br><br>
    <button @click="verifyEmail">Submit</button>
</div>
</template>

<script>
export default {
    name: 'Forgot Email',
}
</script>
