<script setup lang="ts">
import { ref, watch } from "vue";
import SearchableCombobox, {
    type ComboboxItemProp,
} from "@/components/custom_ui/SearchableCombobox/SearchableCombobox.vue";

interface Props {
    year: number;
    month: number;
}

const emit = defineEmits<{
    "update:month": [month: number];
    "update:year": [year: number];
}>();

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const getMonthName = (month: number): string => {
    const auxDate = new Date(currentYear, month, 1);
    return auxDate.toLocaleString("en-US", { month: "long" });
};

const props = withDefaults(defineProps<Props>(), {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
});

const years: ComboboxItemProp[] = [];
for (let i = currentYear - 10; i < currentYear + 10; i++) {
    years.push({ value: i, label: i.toString() });
}

const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
];

const selectedYear = ref<ComboboxItemProp>({
    label: props.year.toString(),
    value: props.year,
});

const selectedMonth = ref<ComboboxItemProp>({
    label: getMonthName(props.month),
    value: props.month,
});

watch(
    () => selectedYear.value,
    (newYear) => {
        emit("update:year", newYear.value);
    },
    { deep: true },
);

watch(
    () => selectedMonth.value,
    (newMonth) => {
        emit("update:month", newMonth.value);
    },
    { deep: true },
);
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
