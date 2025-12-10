<script setup lang="ts">
import { InputType, type FormInputProps } from './types.ts'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const props = withDefaults(defineProps<FormInputProps>(), {
  error: null,
  required: false,
  type: InputType.Text,
  step: '0.01',
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
        <Input
          v-bind="componentField"
          :step="props.type === InputType.Number ? props.step : undefined"
          :type="props.type"
          :placeholder="props.placeholder"
          class="w-full"
        />
      </FormControl>
    </FormItem>
  </FormField>
</template>
