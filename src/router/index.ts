import {createRouter, createWebHistory} from 'vue-router'
import LoginFormView from "@/views/LoginFormView.vue";
import Dashboard from "@/views/Dashboard.vue";
import {useAuth} from "@/composable/useAuth.ts";
import {ref} from "vue";
import EntryFormView from "@/views/EntryFormView.vue";

const auth = useAuth();

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginFormView,
            meta: {layout: 'simple'}
        },
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
        },
        {
            path: '/entry/add',
            name: 'add-entry',
            component: EntryFormView,
        }
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import('../views/AboutView.vue'),
        // },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login' && auth.isAuthenticated.value) {
        return next('/');
    }
    if (to.path !== '/login' && !auth.isAuthenticated.value) {
        next('/login');
    }
    next();
})

export default router
