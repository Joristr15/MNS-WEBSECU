import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import InscriptionForm from '../components/InscriptionForm.vue';
import ConfirmationConnexion from '../components/ConfirmationConnexion.vue';


const routes = [
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/inscription',
    name: 'InscriptionForm',
    component: InscriptionForm
  },
  {
    path: '/connexion-reussie',
    name: 'ConfirmationConnexion',
    component: ConfirmationConnexion
  },
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
