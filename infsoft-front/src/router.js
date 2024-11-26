import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import HomePage from './components/HomePage.vue';

const routes = [
  { path: '/', component: LoginForm },
  { path: '/home', component: HomePage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;