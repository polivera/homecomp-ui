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
import { onMounted } from "vue";
import FormSelect from "@/components/custom_ui/FormSelect/FormSelect.vue";
import type { SelectOption } from "@/components/custom_ui/FormSelect";

// TODO: Credit card needs currency

// Mock credit cards data
const mockCreditCards: SelectOption[] = [
  { value: 1, label: "Visa **** 1234" },
  { value: 2, label: "Mastercard **** 5678" },
  { value: 3, label: "Amex **** 9012" },
];

// Form schema
const formSchema = toTypedSchema(
  z.object({
    creditCard: z.number().positive("Please select a credit card"),
    description: z.string().min(1, "Description is required"),
    amount: z.number().positive("Amount must be positive").multipleOf(0.01),
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
    startDate: new Date().toISOString().split("T")[0],
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
    installments: values.installments,
    interest: values.interest,
    fees: values.fees,
    startDate: values.startDate,
  });

  // Reset form after submission
  form.resetForm({
    values: {
      startDate: new Date().toISOString().split("T")[0],
      interest: 0,
      creditCard: undefined,
      description: "",
      amount: undefined,
      installments: undefined,
      fees: undefined,
    },
  });
});

onMounted(() => {
  // Set default credit card if available
  if (mockCreditCards.length > 0) {
    form.setFieldValue("creditCard", mockCreditCards[0].value as number);
  }
});
</script>

<template>
  <form @submit="formSubmit" class="space-y-4">
    <FormSelect
      name="creditCard"
      label="Credit Card"
      placeholder="Select a credit card"
      :items="mockCreditCards"
      class="w-full"
    />

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="text"
            placeholder="e.g., Monthly grocery purchase"
            class="w-full"
          />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="amount">
      <FormItem>
        <FormLabel>Amount</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            step="0.01"
            type="number"
            placeholder="0.00"
            class="w-full"
          />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="installments">
      <FormItem>
        <FormLabel>Installments</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            step="1"
            type="number"
            placeholder="0"
            class="w-full"
          />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="interest">
      <FormItem>
        <FormLabel>Interest Rate (%)</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            step="0.01"
            type="number"
            placeholder="0.00"
            class="w-full"
            min="0"
            max="100"
          />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="fees">
      <FormItem>
        <FormLabel>Transaction Fees</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            step="0.01"
            type="number"
            placeholder="0.00"
            class="w-full"
            min="0"
          />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="startDate">
      <FormItem>
        <FormLabel>Installments Start Date</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="date" class="w-full" />
        </FormControl>
      </FormItem>
    </FormField>

    <Button variant="default" type="submit" class="w-full"> Submit </Button>
  </form>
</template>
