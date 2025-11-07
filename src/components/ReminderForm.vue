<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { onMounted, computed } from "vue"
import { useCategories } from "@/composable/categories"
import { type IReminderForm, useReminders } from "@/composable/reminders"
import { useToast } from "@/components/ui/toast"
import { Spinner } from "@/components/ui/spinner"
import { useHousehold } from "@/composable/useHousehold.ts"
import { FormSelect, type SelectOption } from "@/components/custom_ui/FormSelect"

const { categoryFetch, fetchCategories } = useCategories()
const { reminderStore, storeReminder } = useReminders()
const { fetchHouseholds, householdFetch } = useHousehold()
const { toast } = useToast()

// Currency options
const currencyOptions: SelectOption[] = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' }
]

// Lapse options (days between reminders)
const lapseOptions: SelectOption[] = [
  { value: 7, label: 'Weekly (7 days)' },
  { value: 14, label: 'Bi-weekly (14 days)' },
  { value: 30, label: 'Monthly (30 days)' },
  { value: 60, label: 'Bi-monthly (60 days)' },
  { value: 90, label: 'Quarterly (90 days)' },
  { value: 365, label: 'Yearly (365 days)' }
]

// Mock owner options (since there's no useOwners composable yet)
const ownerOptions: SelectOption[] = [
  { value: 1, label: 'Me' },
  { value: 2, label: 'Partner' },
  { value: 3, label: 'Family' }
]

// Category options
const categoryOptions = computed<SelectOption[]>(() =>
  categoryFetch.value.categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }))
)

// Household options
const householdOptions = computed<SelectOption[]>(() =>
  householdFetch.value.households.map(household => ({
    value: household.id,
    label: household.name
  }))
)

// Form definition
const formSchema = toTypedSchema(z.object({
  id: z.string().optional().nullable(),
  amount: z.number().positive().multipleOf(0.01),
  currency: z.string(),
  lapse: z.number().positive(),
  dateStart: z.string(),
  dateEnd: z.string(),
  category: z.number().refine(
    (value) => categoryFetch.value.categories.some(category => category.id === value),
    { message: 'Please select a valid category' }
  ),
  owner: z.number(),
  household: z.number().refine(
    (value) => householdFetch.value.households.some(household => household.id === value),
    { message: 'Please select a valid household' }
  ),
}).refine((data) => {
  const start = new Date(data.dateStart)
  const end = new Date(data.dateEnd)
  return end > start
}, {
  message: "End date must be after start date",
  path: ["dateEnd"]
}))

// Form setup
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    currency: 'USD',
    lapse: 30,
    dateStart: new Date().toISOString().split('T')[0],
    dateEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
    owner: 1,
  },
})

// Form submission
const formSubmit = form.handleSubmit(async (values) => {
  const submitData = {
    ...values,
    dateStart: new Date(values.dateStart).toISOString(),
    dateEnd: new Date(values.dateEnd).toISOString(),
  }

  const newReminder: IReminderForm = {
    id: null,
    amount: submitData.amount,
    currency: submitData.currency,
    lapse: submitData.lapse,
    dateStart: submitData.dateStart,
    dateEnd: submitData.dateEnd,
    category: submitData.category,
    owner: submitData.owner,
    household: submitData.household,
  }

  await storeReminder(newReminder)

  form.resetForm({
    values: {
      currency: 'USD',
      lapse: 30,
      dateStart: new Date().toISOString().split('T')[0],
      dateEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: categoryFetch.value.categories.find(category => category.name === 'Uncategorized')?.id,
      owner: 1,
      household: householdFetch.value.households[0]?.id,
      amount: undefined,
    }
  })

  toast({
    description: 'Your reminder has been added successfully.',
  })
})

// Retrieve categories
const getCategories = async () => {
  await fetchCategories()
  form.setFieldValue('category', categoryFetch.value.categories.find(category => category.name === 'Uncategorized')?.id)
}

// Retrieve households
const getHouseholds = async () => {
  await fetchHouseholds()
  form.setFieldValue('household', householdFetch.value.households[0]?.id)
}

// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    getCategories(),
    getHouseholds(),
  ])
})

</script>

<template>
  <form @submit="formSubmit">
    <input type="hidden" name="id" v-model="form.values.id" />

    <FormField v-slot="{ componentField }" name="amount">
      <FormItem>
        <FormLabel>
          Amount
          <span class="text-destructive">*</span>
        </FormLabel>
        <FormControl>
          <Input v-bind="componentField" step="0.01" type="number" class="w-full" placeholder="Enter amount" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormSelect
      name="currency"
      label="Currency"
      placeholder="Select currency"
      :items="currencyOptions"
      :required="true"
    />

    <FormSelect
      name="lapse"
      label="Frequency"
      placeholder="How often should this reminder repeat?"
      :items="lapseOptions"
      :required="true"
    />

    <FormField v-slot="{ componentField }" name="dateStart">
      <FormItem class="mt-4">
        <FormLabel>
          Start Date
          <span class="text-destructive">*</span>
        </FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="date" class="w-full" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="dateEnd">
      <FormItem class="mt-4">
        <FormLabel>
          End Date
          <span class="text-destructive">*</span>
        </FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="date" class="w-full" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormSelect
      name="category"
      label="Category"
      placeholder="Select category"
      :items="categoryOptions"
      :isLoading="categoryFetch.isLoading"
      :error="categoryFetch.error"
      :required="true"
    />

    <FormSelect
      name="owner"
      label="Owner"
      placeholder="Select owner"
      :items="ownerOptions"
      :required="true"
    />

    <FormSelect
      name="household"
      label="Household"
      placeholder="Select household"
      :items="householdOptions"
      :isLoading="householdFetch.isLoading"
      :error="householdFetch.error"
      :required="true"
    />

    <Button
      variant="default"
      type="submit"
      class="mt-4"
      :disabled="categoryFetch.isLoading || householdFetch.isLoading || reminderStore.isLoading"
    >
      <Spinner v-if="categoryFetch.isLoading || householdFetch.isLoading || reminderStore.isLoading" />
      <span v-else>Submit</span>
    </Button>
  </form>
</template>
