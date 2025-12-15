<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type IHouseholdForm, useHousehold } from '@/composable/household'
import { useToast } from '@/components/ui/toast'
import { Spinner } from '@/components/ui/spinner'

const { storedData, store: storeHousehold } = useHousehold()
const { toast } = useToast()

const formSchema = toTypedSchema(
  z.object({
    id: z.number().optional().nullable(),
    name: z.string().min(1, 'Name is required'),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    id: null,
    name: '',
  },
})

const formSubmit = form.handleSubmit(async values => {
  const newHousehold: IHouseholdForm = {
    id: null,
    name: values.name,
  }

  await storeHousehold(newHousehold)

  toast({
    description: 'Household has been added successfully.',
  })

  form.resetForm({
    values: {
      id: null,
      name: '',
    },
  })
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
          <Input v-bind="componentField" type="text" class="w-full" placeholder="Enter household name" />
        </FormControl>
      </FormItem>
    </FormField>

    <Button variant="default" type="submit" class="mt-4" :disabled="storedData.isLoading">
      <Spinner v-if="storedData.isLoading" />
      <span v-else>Submit</span>
    </Button>
  </form>
</template>

<style scoped></style>
