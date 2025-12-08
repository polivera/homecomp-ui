<script setup lang="ts">
import { computed } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { onMounted } from "vue";
import FormSelect from "@/components/custom_ui/FormSelect/FormSelect.vue";
import type { SelectOption } from "@/components/custom_ui/FormSelect";
import { useDate } from "@/composable/useDate";
import {
  useCreditCards,
  useCreditCardsEntries,
} from "@/composable/creditcards";
import { useCurrency } from "@/composable/currency";
import { FormInput, InputType } from "@/components/custom_ui/FormInput";
import { useCategories } from "@/composable/categories";
import { toast } from "@/components/ui/toast";

const { getFirstDayOfNextMonthString } = useDate();
const { fetchedData: ccData, fetch: ccFetch } = useCreditCards();
const { store: ccStore } = useCreditCardsEntries();
const { fetch: currencyFetch, fetchData: currencyData } = useCurrency();

const {
  fetch: fetchCategories,
  fetchedData: categoryData,
  getDefaultCategory,
} = useCategories();

// Fill credit cards data dropdown
const creditCards = computed<SelectOption[]>(() =>
  ccData.value.cards.map((it) => ({
    value: it.id,
    label: it.name,
  })),
);

const currencies = computed<SelectOption[]>(() =>
  currencyData.value.currencies.map((it) => ({
    value: it.valueOf() as string,
    label: it,
  })),
);

const categories = computed<SelectOption[]>(() =>
  categoryData.value.categories.map((it) => ({
    value: it.id,
    label: it.name,
  })),
);

// Form schema
const formSchema = toTypedSchema(
  z.object({
    creditCard: z.string(),
    description: z.string().min(1, "Description is required"),
    amount: z.number().positive("Amount must be positive").multipleOf(0.01),
    currency: z.string(),
    category: z.number(),
    installments: z
      .number()
      .positive("Must be a positive number")
      .multipleOf(1),
    interest: z
      .number()
      .min(0, "Interest cannot be negative")
      .max(100, "Interest cannot exceed 100%"),
    fees: z.number().min(0),
    startDate: z.string().min(1, "Start date is required"),
  }),
);

// Form setup
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    startDate: getFirstDayOfNextMonthString(),
    interest: 0,
    fees: 0,
  },
});

// Form submission
const formSubmit = form.handleSubmit(async (values) => {
  await ccStore({
    id: null,
    cardId: values.creditCard,
    description: values.description,
    amount: values.amount,
    category: values.category,
    installments: values.installments,
    interestRate: values.interest,
    fees: values.fees,
    startDate: values.startDate,
  });

  toast({
    description: "Your credit card entry has been store successfuly",
  });

  // Reset form after submission
  form.resetForm({
    values: {
      startDate: getFirstDayOfNextMonthString(),
      interest: 0,
      creditCard: undefined,
      description: "",
      amount: undefined,
      currency: currencyData.value.currencies[0].valueOf() ?? undefined,
      category: getDefaultCategory()?.id,
      installments: undefined,
      fees: undefined,
    },
  });
});

onMounted(async () => {
  // Set default credit card if available
  await Promise.all([ccFetch(), currencyFetch(), fetchCategories()]);
  form.setFieldValue("category", getDefaultCategory()?.id);
});
</script>

<template>
  <form
    class="space-y-4"
    @submit="formSubmit"
  >
    <FormSelect
      name="creditCard"
      label="Credit Card"
      placeholder="Select a credit card"
      :items="creditCards"
      class="w-full"
      :is-loading="ccData.isLoading"
      :required="true"
    />

    <FormInput
      name="description"
      label="Description"
      :required="true"
      :type="InputType.Text"
      placeholder="e.g., My new shoes"
    />

    <FormSelect
      name="currency"
      label="Currency"
      placeholder="Select a currency"
      :items="currencies"
      class="w-full"
      :is-loading="currencyData.isLoading"
      :required="true"
    />

    <FormSelect
      name="category"
      label="Category"
      placeholder="Select category"
      :items="categories"
      :is-loading="categoryData.isLoading"
      :error="categoryData.error"
      :required="true"
    />

    <FormInput
      name="amount"
      label="Amount"
      :required="true"
      :type="InputType.Number"
      placeholder="0.00"
      step="0.01"
    />

    <FormInput
      name="installments"
      label="Installments"
      :required="true"
      :type="InputType.Number"
      placeholder="0"
      step="1"
    />

    <FormInput
      name="interest"
      label="Interest Rate (%)"
      :required="false"
      :type="InputType.Number"
      placeholder="0.00"
      step="0.01"
    />

    <FormInput
      name="fees"
      label="Transaction Fees"
      :required="false"
      :type="InputType.Number"
      placeholder="0.00"
      step="0.01"
    />

    <FormInput
      name="startDate"
      label="Installemnts Start Date"
      :required="false"
      :type="InputType.Date"
    />

    <Button
      variant="default"
      type="submit"
      class="w-full"
    >
      Submit
    </Button>
  </form>
</template>
