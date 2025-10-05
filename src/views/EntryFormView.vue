<script setup lang="ts">
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Loader2} from "lucide-vue-next"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useAccounts} from "@/composable/useAccounts.ts";
import {onMounted} from "vue";

const {accounts, getAccounts, isLoading: accountsLoading, error: accountsError} = useAccounts();

const formSchema = toTypedSchema(z.object({
  entryType: z.string(),
  amount: z.number().min(1),
  description: z.string().min(1),
  date: z.string(),
  account: z.number().refine((value) => accounts.value.some(account => account.id === value), {}),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    entryType: 'expense', // Pre-select here
    date: new Date().toISOString().split('T')[0],
    account: accounts.value.find(account => account.default)?.id,
  },
})

const formSubmit = form.handleSubmit((values) => {
  const submitData = {
    ...values,
    date: new Date(values.date).toISOString(),
  }
  console.log(submitData)
})

onMounted(async () => {
  await getAccounts();
  // Set the default account after loading
  const defaultAccount = accounts.value.find(account => account.default)
  if (defaultAccount) {
    form.setFieldValue('account', defaultAccount.id)
  }
})
</script>

<template>
  <form @submit="formSubmit">
    <FormField v-slot="{ componentField }" name="entryType">
      <FormItem>
        <FormLabel>Entry Type</FormLabel>
        <FormControl>
          <Select v-bind="componentField" class="w-full">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select type of expense"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="amount">
      <FormItem class="mt-4">
        <FormLabel>Amount</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="number" class="w-full"/>
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem class="mt-4">
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" class="w-full"/>
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="date">
      <FormItem class="mt-4">
        <FormLabel>Date</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="date" class="w-full"/>
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="account">
      <FormItem class="mt-4">
        <FormLabel>Account</FormLabel>
        <FormControl>
          <Select v-bind="componentField" class="w-full">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select account">
                <span v-if="accountsLoading" class="flex items-center gap-2">
                  <Loader2 class="h-4 w-4 animate-spin"/>
                  Loading accounts...
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="item in accounts" :key="item.id" :value="item.id">
                  {{ item.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    </FormField>

    <Button variant="default" type="submit" class="mt-4">Submit</Button>
  </form>
</template>