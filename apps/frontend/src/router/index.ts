// Composables
import { useAuthStore } from '@/store/auth';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/Auth/Login.vue'),
      },
      {
        path: '/logout',
        name: 'Logout',
        component: () =>
          import(/* webpackChunkName: "logout" */ '@/views/Auth/Logout.vue'),
      },
      {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: () =>
          import(
            /* webpackChunkName: "forgotpassword" */ '@/views/Auth/ForgotPassword.vue'
          ),
      },
      {
        path: '/changepassword/:hash',
        name: 'ChangePassword',
        component: () =>
          import(
            /* webpackChunkName: "changepassword" */ '@/views/Auth/ChangePassword.vue'
          ),
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () =>
          import(/* webpackChunkName: "signup" */ '@/views/Auth/Signup.vue'),
      },
      {
        path: '',
        name: 'Home',
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const store = useAuthStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login';
});

export default router;
