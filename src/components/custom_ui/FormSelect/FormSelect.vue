<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from "@/components/ui/spinner"

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface FormSelectProps {
  name: string
  label: string
  placeholder: string
  items: SelectOption[]
  isLoading?: boolean
  error?: string | null
  required?: boolean
  class?: string
}

const props = withDefaults(defineProps<FormSelectProps>(), {
  isLoading: false,
  error: null,
  required: false,
  class: 'mt-4'
})
</script>

<template>
  <FormField v-slot="{ componentField }" :name="props.name">
    <FormItem :class="props.class">
      <FormLabel>
        {{ props.label }}
        <span v-if="props.required" class="text-destructive">*</span>
      </FormLabel>
      <FormControl>
        <Select v-bind="componentField" class="w-full">
          <SelectTrigger class="w-full">
            <SelectValue :placeholder="props.placeholder">
              <span v-if="props.isLoading" class="flex items-center gap-2">
                <Spinner />
                Loading {{ props.label.toLowerCase() }}...
              </span>
              <span v-else-if="props.error" class="text-destructive">
                Error loading {{ props.label.toLowerCase() }}: {{ props.error }}
              </span>
              <span v-else-if="!props.isLoading && props.items.length === 0">
                No {{ props.label.toLowerCase() }} found.
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="item in props.items"
                :key="item.value"
                :value="item.value"
                :disabled="item.disabled"
              >
                {{ item.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
