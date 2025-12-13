<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { computed, onMounted, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import z from 'zod'
import { useForm } from 'vee-validate'
import { useAccounts } from '@/composable/accounts'
import { FormSelect, type SelectOption } from '@/components/custom_ui/FormSelect'
import type { IReminderPayFormData, ReminderPayFormProps } from './types'
import { useDate } from '@/composable/useDate'

const props = withDefaults(defineProps<ReminderPayFormProps>(), {
  defaultAmount: 0,
})

const emit = defineEmits<{
  submit: [values: IReminderPayFormData]
}>()

const { fetchData: accountData, fetchWithCurrency: fetchAccounts } = useAccounts()
const { getTodayISO } = useDate()

const dialogOpen = ref(false)

const formSchema = toTypedSchema(
  z.object({
    amount: z.number().positive().multipleOf(0.01),
    date: z.string(),
    account: z.number().positive(),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    amount: props.defaultAmount,
    date: getTodayISO(),
  },
})

const formSubmit = form.handleSubmit(async values => {
  emit('submit', values)
  dialogOpen.value = false
})

const accountOptions = computed<SelectOption[]>(() => {
  return accountData.value.accounts.map(account => ({
    value: account.id,
    label: account.name,
  }))
})

onMounted(async () => {
  await fetchAccounts(props.payCurrency)
})
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button class="w-full"> Pay </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <form @submit="formSubmit">
        <DialogHeader>
          <DialogTitle>Pay Reminder</DialogTitle>
          <DialogDescription> Pay current reminder to convert it to entry </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4">
          <FormField v-slot="{ componentField }" name="amount">
            <FormItem class="mt-4">
              <FormLabel>
                Amount
                <span class="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input v-bind="componentField" step="0.01" type="number" class="w-full" placeholder="Enter amount" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="date">
            <FormItem class="mt-4">
              <FormLabel>
                Date
                <span class="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="date" class="w-full" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormSelect
            name="account"
            label="Account"
            placeholder="Select an account"
            :items="accountOptions"
            :is-loading="accountData.isLoading"
            :error="accountData.error"
            :required="true"
          />
        </div>
        <DialogFooter class="mt-4">
          <DialogClose as-child>
            <Button variant="outline"> Cancel </Button>
          </DialogClose>
          <Button type="submit"> Save changes </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
