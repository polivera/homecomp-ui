import { createRouter, createWebHistory } from 'vue-router'
import LoginFormView from "@/views/LoginFormView.vue";
import Dashboard from "@/views/Dashboard.vue";
import { useAuth } from "@/composable/useAuth.ts";
import EntryFormView from "@/views/entries/EntryFormView.vue";
import EntryList from "@/views/entries/EntryListView.vue";
import ReminderFormView from "@/views/reminders/ReminderFormView.vue";
import ReminderListView from '@/views/reminders/ReminderListView.vue';
import ReminderDetailView from '@/views/reminders/ReminderDetailView.vue';

const auth = useAuth();

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginFormView,
            meta: { layout: 'simple' }
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
        },
        {
            path: '/entry/list',
            name: 'entry-list',
            component: EntryList,
        },
        {
            path: '/reminder/list',
            name: 'reminder-list',
            component: ReminderListView,
        },
        {
            path: '/reminder/add',
            name: 'add-reminder',
            component: ReminderFormView,
        },
        {
            // This is for ID v7
            path: '/reminder/detail/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
            name: 'reminder-detail',
            component: ReminderDetailView
        }
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
