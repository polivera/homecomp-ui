<script setup lang="ts">

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader, SidebarMenuButton, SidebarMenuItem, useSidebar
} from "@/components/ui/sidebar";
import {Calendar, Home, Inbox, Search, Settings, PlusCircleIcon, Wallet, CalendarCog} from "lucide-vue-next";

const {toggleSidebar, isMobile} = useSidebar()

const mobileToggleSidebar = () => {
  if (isMobile.value) {
    toggleSidebar()
  }
}

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
    url: "#",
    icon: CalendarCog,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader/>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <RouterLink to="/entry/add">
                <PlusCircleIcon/>
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
                <span @click="mobileToggleSidebar">{{item.title}}</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter/>
  </Sidebar>
</template>

<style scoped>

</style>