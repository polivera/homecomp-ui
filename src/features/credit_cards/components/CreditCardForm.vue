<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type ICreditCardForm, useCreditCards } from '@/composable/creditcards'
import { useCurrency } from '@/composable/currency'
import { useToast } from '@/components/ui/toast'
import { Spinner } from '@/components/ui/spinner'
import FormSelect from '@/components/custom_ui/FormSelect/FormSelect.vue'
import type { SelectOption } from '@/components/custom_ui/FormSelect'
import { computed, onMounted } from 'vue'

const { storedData, store: storeCreditCard } = useCreditCards()
const { fetchData: currencyData, fetch: fetchCurrencies } = useCurrency()
const { toast } = useToast()

const currencyOptions = computed<SelectOption[]>(() =>
  currencyData.value.currencies.map(currency => ({
    value: currency,
    label: currency,
  }))
)

const formSchema = toTypedSchema(
  z.object({
    id: z.string().optional().nullable(),
    name: z.string().min(1, 'Name is required'),
    currency: z.string().min(1, 'Currency is required'),
    limit: z.number().positive('Limit must be positive'),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    id: null,
    name: '',
    currency: 'USD',
    limit: 0,
  },
})

const formSubmit = form.handleSubmit(async values => {
  const newCreditCard: ICreditCardForm = {
    id: null,
    name: values.name,
    limits: [
      {
        limit: values.limit,
        used: 0,
        currency: values.currency,
      }
    ],
  }

  await storeCreditCard(newCreditCard)

  toast({
    description: 'Credit card has been added successfully.',
  })

  form.resetForm({
    values: {
      id: null,
      name: '',
      currency: 'USD',
      limit: 0,
    },
  })
})

onMounted(async () => {
  await fetchCurrencies()
})
</script>

<template>
  <form @submit="formSubmit">
    <input v-model="form.values.id" type="hidden" name="id" />

    <FormField v-slot="{ componentField }" name="name">
      <FormItem class="mt-4">
        <FormLabel>
          Name
          <span class="text-destructive">*</span>
        </FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" class="w-full" placeholder="Enter credit card name" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormSelect
      name="currency"
      label="Currency"
      placeholder="Select currency"
      :items="currencyOptions"
      :is-loading="currencyData.isLoading"
      :error="currencyData.error"
      :required="true"
      class="mt-4"
    />

    <FormField v-slot="{ componentField }" name="limit">
      <FormItem class="mt-4">
        <FormLabel>
          Credit Limit
          <span class="text-destructive">*</span>
        </FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="number" step="0.01" class="w-full" placeholder="0.00" />
        </FormControl>
      </FormItem>
    </FormField>

    <Button variant="default" type="submit" class="mt-4" :disabled="storedData.isLoading || currencyData.isLoading">
      <Spinner v-if="storedData.isLoading || currencyData.isLoading" />
      <span v-else>Submit</span>
    </Button>
  </form>
</template>

<style scoped></style>
