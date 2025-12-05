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
import { useCreditCards } from "@/composable/creditcards/useCreditCard";
import { useCurrency } from "@/composable/currency";
import { FormInput, InputType } from "@/components/custom_ui/FormInput";
import { useCategories } from "@/composable/categories";

const { getFirstDayOfNextMonthString } = useDate();
const { fetchedData: ccData, fetch: ccFetch } = useCreditCards();
const { fetch: currencyFetch, fetchData: currencyData } = useCurrency();
const {} = useCategories();

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

// Form schema
const formSchema = toTypedSchema(
  z.object({
    creditCard: z.string(),
    description: z.string().min(1, "Description is required"),
    amount: z.number().positive("Amount must be positive").multipleOf(0.01),
    currency: z.string(),
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
  console.log("Credit Card Entry Form Data:", {
    creditCard: values.creditCard,
    description: values.description,
    amount: values.amount,
    currency: values.currency,
    installments: values.installments,
    interest: values.interest,
    fees: values.fees,
    startDate: values.startDate,
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
      installments: undefined,
      fees: undefined,
    },
  });
});

onMounted(async () => {
  // Set default credit card if available
  await Promise.all([ccFetch(), currencyFetch()]);
});
</script>

<template>
  <form @submit="formSubmit" class="space-y-4">
    <FormSelect
      name="creditCard"
      label="Credit Card"
      placeholder="Select a credit card"
      :items="creditCards"
      class="w-full"
      :isLoading="ccData.isLoading"
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
      :isLoading="currencyData.isLoading"
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

    <Button variant="default" type="submit" class="w-full"> Submit </Button>
  </form>
</template>
