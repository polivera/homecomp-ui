<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Home,
  PlusCircleIcon,
  Wallet,
  CalendarCog,
  CreditCardIcon,
  PiggyBankIcon,
} from "lucide-vue-next";

const { toggleSidebar, isMobile } = useSidebar();

const mobileToggleSidebar = () => {
  if (isMobile.value) {
    toggleSidebar();
  }
};

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Entries",
    url: "/entry/list",
    icon: Wallet,
  },
  {
    title: "Reminders",
    url: "/reminder/list",
    icon: CalendarCog,
  },
  {
    title: "Credit Cards",
    url: "#",
    icon: CreditCardIcon,
  },
];

const settings = [
  {
    title: "Accounts",
    url: "#",
    icon: PiggyBankIcon,
  },
  {
    title: "Credit Cards",
    url: "#",
    icon: PiggyBankIcon,
  },
  {
    title: "Households",
    url: "#",
    icon: PiggyBankIcon,
  },
];

const admin = [
  {
    title: "Categories",
    url: "#",
    icon: PiggyBankIcon,
  },
  {
    title: "Users",
    url: "#",
    icon: PiggyBankIcon,
  },
];
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <RouterLink to="/entry/add">
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
          <SidebarMenuItem v-for="item in items" :key="item.title">
            <SidebarMenuButton asChild>
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
          <SidebarMenuItem v-for="item in settings" :key="item.title">
            <SidebarMenuButton asChild>
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
          <SidebarMenuItem v-for="item in admin" :key="item.title">
            <SidebarMenuButton asChild>
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
