<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchableCombobox, {
  type ComboboxItemProp,
} from '@/components/custom_ui/SearchableCombobox/SearchableCombobox.vue'
import { useDate } from '@/composable/useDate'

interface Props {
  year?: number
  month?: number
}

const emit = defineEmits<{
  'update:month': [month: number]
  'update:year': [year: number]
}>()

const { getMonthName, getCurrentYear } = useDate()

const props = withDefaults(defineProps<Props>(), {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
})

const currentYear = getCurrentYear()

const years: ComboboxItemProp[] = []
for (let i = currentYear - 10; i < currentYear + 10; i++) {
  years.push({ value: i, label: i.toString() })
}

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

const selectedYear = ref<ComboboxItemProp>({
  label: props.year.toString(),
  value: props.year,
})

const selectedMonth = ref<ComboboxItemProp>({
  label: getMonthName(props.month),
  value: props.month,
})

watch(
  () => selectedYear.value,
  newYear => {
    emit('update:year', newYear.value)
  },
  { deep: true }
)

watch(
  () => selectedMonth.value,
  newMonth => {
    console.log(newMonth.value)
    emit('update:month', newMonth.value)
  },
  { deep: true }
)
</script>

<template>
  <h3 class="text-center py-4">Select month and year</h3>
  <div class="flex justify-center gap-4" data-slot="month-and-year-select">
    <SearchableCombobox
      v-model="selectedMonth"
      :items="months"
      placeholder="Select Month"
      search-placeholder="Select Month..."
      empty-message="No month found."
    />

    <SearchableCombobox
      v-model="selectedYear"
      :items="years"
      placeholder="Select Year"
      search-placeholder="Select Year..."
      empty-message="No year found."
    />
  </div>
</template>
