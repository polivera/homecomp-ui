import { createRouter, createWebHistory } from 'vue-router'
import { LoginFormView } from "@/features/auth/views/";
import Dashboard from "@/views/Dashboard.vue";
import { useAuth } from "@/composable/auth";
import { EntryListView, EntryFormView } from "@/features/entries/views";
import { ReminderListView, ReminderFormView, ReminderDetailView } from '@/features/reminders/views'
import { CreditCardEntryFormView, CreditCardEntryListView, CreditCardFormView, CreditCardListView } from '@/features/credit_cards/views/';
import { HouseholdEntryListView, HouseholdListView, HouseholdFormView } from '@/features/households/views/';
import { MyAccountsListView } from '@/features/accounts/views/';
import { MyProfileView } from '@/features/reminders/users/views/';
import { CategoryListView } from '@/features/categories/views/';



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
        // Entries ----------------------------------------------
        {
            path: '/entry/form',
            name: 'add-entry',
            component: EntryFormView,
        },
        {
            path: '/entry/list',
            name: 'entry-list',
            component: EntryListView,
        },
        // Reminders ----------------------------------------------
        {
            path: '/reminder/list',
            name: 'reminder-list',
            component: ReminderListView,
        },
        {
            path: '/reminder/form',
            name: 'add-reminder',
            component: ReminderFormView,
        },
        {
            // This is for ID v7
            path: '/reminder/detail/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
            name: 'reminder-detail',
            component: ReminderDetailView
        },
        // Credit Cards ----------------------------------------------
        {
            path: '/credit-card-entry/list',
            name: 'credit-card-entry-list',
            component: CreditCardEntryListView
        },
        {
            path: '/credit-card-entry/detail/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
            name: 'credit-card-entry-detail',
            component: CreditCardEntryListView
        },
        {
            path: '/credit-card-entry/form',
            name: 'credit-card-entry-add',
            component: CreditCardEntryFormView
        },
        {
            path: '/credit-card/form',
            name: 'credit-card-add',
            component: CreditCardFormView
        },
        {
            path: '/credit-card/list',
            name: 'credit-card-list',
            component: CreditCardListView
        },
        // Households ----------------------------------------------
        {
            path: '/household-entry/list',
            name: 'household-entry-list',
            component: HouseholdEntryListView
        },
        {
            path: '/household/list',
            name: 'household-list',
            component: HouseholdListView
        },
        {
            path: '/household/form',
            name: 'household-add',
            component: HouseholdFormView
        },
        // Accounts ----------------------------------------------
        {
            path: '/account/list',
            name: 'accounts-list',
            component: MyAccountsListView
        },
        // Users ----------------------------------------------
        {
            path: '/my-profile',
            name: 'my-profile',
            component: MyProfileView
        },
        {
            path: '/admin/user/list',
            name: 'user-list',
            component: MyProfileView
        },
        // Categories ----------------------------------------------
        {
            path: '/admin/category/list',
            name: 'category-list',
            component: CategoryListView
        },
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
