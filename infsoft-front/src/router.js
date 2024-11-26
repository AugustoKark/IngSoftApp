import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import HomePage from './components/HomePage.vue';
import MyRentals from './components/MyRentals.vue';

const routes = [
  { path: '/', component: LoginForm },
  { path: '/home', component: HomePage },
  {path: '/my-rentals', component: MyRentals}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;