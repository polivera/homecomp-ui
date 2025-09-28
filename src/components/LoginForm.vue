<script setup lang="ts">
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {useAuth} from "@/composable/useAuth.ts";
import type {UseAuth, LoginCredentials} from "@/composable/useAuth.ts";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";


interface LoginFormProps {
  email: string;
  password: string
}

const router = useRouter();

const auth: UseAuth = useAuth();
const loginForm = reactive<LoginFormProps>({
  email: '',
  password: '',
})

const messageClass = ref<string>('text-muted-foreground')
const messageText = ref<string>('Enter your email below to login to your account')


const submitLogin = async () => {
  const loginCredentials: LoginCredentials = {
    email: loginForm.email,
    password: loginForm.password,
  }
  const response = await auth.login(loginCredentials);
  if (response.success) {
    await router.push({name: 'dashboard'});
    return;
  }
  messageClass.value = 'text-red-500';
  messageText.value = response.message as string;
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="submitLogin">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">
        Login to your account
      </h1>
      <p class="text-balance text-sm" :class="messageClass">
        {{ messageText }}
      </p>
    </div>
    <div class="grid gap-6">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" v-model="loginForm.email" required/>
      </div>
      <div class="grid gap-2">
        <div class="flex items-center">
          <Label for="password">Password</Label>
        </div>
        <Input id="password" type="password" v-model="loginForm.password" required/>
      </div>
      <Button type="submit" variant="default" class="w-full cursor-pointer">
        Login
      </Button>
    </div>
    <div class="text-center text-sm">
      Don't have an account?
      <a href="#" class="underline underline-offset-4">
        Sign up
      </a>
    </div>
  </form>
</template>

<style scoped>

</style>