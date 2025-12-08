<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import {
  Home,
  PlusCircleIcon,
  Wallet,
  CalendarCog,
  CreditCardIcon,
  PiggyBankIcon,
  WalletCardsIcon,
  HousePlusIcon,
  ChartColumnStackedIcon,
  UserRoundCogIcon,
  UserPenIcon,
  HouseIcon,
} from 'lucide-vue-next'

const { toggleSidebar, isMobile } = useSidebar()

const mobileToggleSidebar = () => {
  if (isMobile.value) {
    toggleSidebar()
  }
}

const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Entries',
    url: '/entry/list',
    icon: Wallet,
  },
  {
    title: 'Reminders',
    url: '/reminder/list',
    icon: CalendarCog,
  },
  {
    title: 'Credit Cards',
    url: '/credit-card-entry/list',
    icon: CreditCardIcon,
  },
  {
    title: 'Households',
    url: '/household-entry/list',
    icon: HouseIcon,
  },
]

const settings = [
  {
    title: 'My Accounts',
    url: '#',
    icon: PiggyBankIcon,
  },
  {
    title: 'My Credit Cards',
    url: '/credit-card/list',
    icon: WalletCardsIcon,
  },
  {
    title: 'My Households',
    url: '/household/list',
    icon: HousePlusIcon,
  },
  {
    title: 'My Profile',
    url: '#',
    icon: UserPenIcon,
  },
]

const admin = [
  {
    title: 'Categories',
    url: '#',
    icon: ChartColumnStackedIcon,
  },
  {
    title: 'Users',
    url: '#',
    icon: UserRoundCogIcon,
  },
]
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <RouterLink to="/entry/form">
                <PlusCircleIcon />
                <span @click="mobileToggleSidebar">Add Entry</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem
            v-for="item in items"
            :key="item.title"
          >
            <SidebarMenuButton as-child>
              <RouterLink :to="item.url">
                <component :is="item.icon" />
                <span @click="mobileToggleSidebar">{{ item.title }}</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem
            v-for="item in settings"
            :key="item.title"
          >
            <SidebarMenuButton as-child>
              <RouterLink :to="item.url">
                <component :is="item.icon" />
                <span @click="mobileToggleSidebar">{{ item.title }}</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Admin</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem
            v-for="item in admin"
            :key="item.title"
          >
            <SidebarMenuButton as-child>
              <RouterLink :to="item.url">
                <component :is="item.icon" />
                <span @click="mobileToggleSidebar">{{ item.title }}</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
