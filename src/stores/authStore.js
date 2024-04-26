import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    loginToken: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    emailToken: null,
    user: localStorage.getItem('user') || null,
  }),
  actions: {
    setEmailToken(token) {
      this.emailToken = token;
    },
    setLoginToken(token) {
      this.loginToken = token;
      localStorage.setItem('token', token);
      this.isAuthenticated = true;
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', user);
    },
    getEmailToken(){
      return this.emailToken;
    },
    getLoginToken(){
      return this.loginToken;
    },
    getUser(){
      return this.user;
    },
    clearLoginToken() {
      this.loginToken = null;
      localStorage.removeItem('token');
      this.isAuthenticated = false;
    },
    clearEmailToken() {
      this.emailToken = null;
    },
    clearUser(){
      this.user = null;
      localStorage.removeItem('user');
    },
    isLoggedIn() {
      return !!this.loginToken;
    },
  },
});