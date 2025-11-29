<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { onMounted, computed } from "vue";
import { useCategories } from "@/composable/categories";
import { type IReminderForm, useReminders } from "@/composable/reminders";
import { useToast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { useHousehold } from "@/composable/useHousehold.ts";
import {
  FormSelect,
  type SelectOption,
} from "@/components/custom_ui/FormSelect";
import { useDate } from "@/composable/useDate";
import { useCurrency } from "@/composable/useCurrency";
import { useReminderInterval } from "@/composable/useReminderInterval";

const { categoryFetch, fetchCategories } = useCategories();
const { storedData: reminderStore, store: storeReminder } = useReminders();
const { fetchHouseholds, householdFetch } = useHousehold();
const { getCurrencyOptions, getDefaultCurrency } = useCurrency();
const { getFirstDayOfNextMonthString } = useDate();
const { toast } = useToast();
const { getIntervals } = useReminderInterval();

// Currency options
const currencyOptions = getCurrencyOptions();

// Lapse options (days between reminders)
const lapseOptions: SelectOption[] = getIntervals().map((it) => ({
  value: it.key,
  label: it.description,
}));

// Category options
const categoryOptions = computed<SelectOption[]>(() =>
  categoryFetch.value.categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  })),
);

// Household options
const householdOptions = computed<SelectOption[]>(() =>
  householdFetch.value.households.map((household) => ({
    value: household.id,
    label: household.name,
  })),
);

// Form definition
const formSchema = toTypedSchema(
  z
    .object({
      id: z.string().optional().nullable(),
      amount: z.number().positive().multipleOf(0.01),
      description: z.string(),
      currency: z.string(),
      lapse: z.number().positive(),
      dateStart: z.string(),
      dateEnd: z.string().nullish(),
      category: z
        .number()
        .refine(
          (value) =>
            categoryFetch.value.categories.some(
              (category) => category.id === value,
            ),
          { message: "Please select a valid category" },
        ),
      household: z
        .number()
        .nullish()
        .refine(
          (value) =>
            value === null ||
            value === undefined ||
            householdFetch.value.households.some(
              (household) => household.id === value,
            ),
          { message: "Please select a valid household" },
        ),
    })
    .refine(
      (data) => {
        if (data.dateEnd) {
          const start = new Date(data.dateStart);
          const end = new Date(data.dateEnd);
          return end > start;
        }
        return true;
      },
      {
        message: "End date must be after start date",
        path: ["dateEnd"],
      },
    ),
);

// Form setup
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    currency: getDefaultCurrency(),
    lapse: 30,
    household: null,
    dateStart: getFirstDayOfNextMonthString(),
  },
});

// Form submission
const formSubmit = form.handleSubmit(async (values) => {
  const submitData = {
    ...values,
    dateStart: new Date(values.dateStart).toISOString(),
  };

  if (values.dateEnd) {
    submitData.dateEnd = new Date(values.dateEnd).toISOString();
  }

  const newReminder: IReminderForm = {
    id: null,
    amount: submitData.amount,
    description: submitData.description,
    currency: submitData.currency,
    lapse: submitData.lapse,
    dateStart: submitData.dateStart,
    dateEnd: submitData?.dateEnd || null,
    category: submitData.category,
    household: submitData?.household || null,
  };

  await storeReminder(newReminder);

  form.resetForm({
    values: {
      currency: getDefaultCurrency(),
      lapse: 30,
      dateStart: getFirstDayOfNextMonthString(),
      dateEnd: null,
      category: categoryFetch.value.categories.find(
        (category) => category.name === "Uncategorized",
      )?.id,
      household: null,
      amount: undefined,
    },
  });

  toast({
    description: "Your reminder has been added successfully.",
  });
});

// Retrieve categories
const getCategories = async () => {
  await fetchCategories();
  form.setFieldValue(
    "category",
    categoryFetch.value.categories.find(
      (category) => category.name === "Uncategorized",
    )?.id,
  );
};

// Retrieve households
const getHouseholds = async () => {
  await fetchHouseholds();
  form.setFieldValue("household", null);
};

// Fetch data on mount
onMounted(async () => {
  await Promise.all([getCategories(), getHouseholds()]);
});
</script>

<template>
  <form @submit="formSubmit">
    <input type="hidden" name="id" v-model="form.values.id" />

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
        <FormLabel> End Date </FormLabel>
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
      name="household"
      label="Household"
      placeholder="Select household (optional)"
      :items="householdOptions"
      :isLoading="householdFetch.isLoading"
      :error="householdFetch.error"
      :required="false"
    />

    <FormField v-slot="{ componentField }" name="description">
      <FormItem class="mt-4">
        <FormLabel>
          Description
          <span class="text-destructive">*</span>
        </FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" class="w-full" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="amount">
      <FormItem class="mt-4">
        <FormLabel>
          Amount
          <span class="text-destructive">*</span>
        </FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            step="0.01"
            type="number"
            class="w-full"
            placeholder="Enter amount"
          />
        </FormControl>
      </FormItem>
    </FormField>

    <Button
      variant="default"
      type="submit"
      class="mt-4"
      :disabled="
        categoryFetch.isLoading ||
        householdFetch.isLoading ||
        reminderStore.isLoading
      "
    >
      <Spinner
        v-if="
          categoryFetch.isLoading ||
          householdFetch.isLoading ||
          reminderStore.isLoading
        "
      />
      <span v-else>Submit</span>
    </Button>
  </form>
</template>
