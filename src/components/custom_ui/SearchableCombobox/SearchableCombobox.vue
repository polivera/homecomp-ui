<script setup lang="ts" generic="T extends { value: any; label: string }">
import { Button } from '@/components/ui/button'
import { Check, Search, ChevronsUpDown } from 'lucide-vue-next'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxList,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxEmpty,
  ComboboxGroup,
} from '@/components/ui/combobox'
import { cn } from '@/lib/utils.ts'

export interface ComboboxItemProp {
  value: any
  label: string
}

interface Props {
  modelValue: T | null
  items: T[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  buttonClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select option',
  searchPlaceholder: 'Search...',
  emptyMessage: 'No items found.',
  buttonClass: 'w-40',
})

const emit = defineEmits<{
  'update:modelValue': [value: T]
}>()

const handleUpdate = (value: unknown) => {
  emit('update:modelValue', value as T)
}
</script>

<template>
  <Combobox
    :model-value="modelValue"
    by="label"
    @update:model-value="handleUpdate"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          variant="outline"
          :class="cn('justify-between', props.buttonClass)"
        >
          {{ modelValue?.label ?? props.placeholder }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput
          class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
          :placeholder="props.searchPlaceholder"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>

      <ComboboxEmpty>{{ props.emptyMessage }}</ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="item in props.items"
          :key="item.value"
          :value="item"
        >
          {{ item.label }}
          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
