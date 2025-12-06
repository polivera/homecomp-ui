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
import { useAccounts } from "@/composable/accounts";
import { computed, onMounted } from "vue";
import { useCategories } from "@/composable/categories";
import { type IEntryForm, useEntries } from "@/composable/entries";
import { useToast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { useHousehold } from "@/composable/household";
import FormSelect from "@/components/custom_ui/FormSelect/FormSelect.vue";
import type { SelectOption } from "@/components/custom_ui/FormSelect";
import type { IAccount } from "@/composable/accounts";

const { accountFetch, fetch: fetchAccounts } = useAccounts();
const { fetchedData: categories, fetch: fetchCategories } = useCategories();
const { entryStore, storeEntry } = useEntries();
const { fetch: fetchHouseholds, fetchedData: householdFetch } = useHousehold();
const { toast } = useToast();

const householdOptions = computed<SelectOption[]>(() => {
  let data: SelectOption[] = householdFetch.value.households.map((it) => ({
    value: it.id,
    label: it.name,
  }));
  data = [{ value: null, label: "Select a household (optional)" }, ...data];
  return data;
});

// Form definition
const formSchema = toTypedSchema(
  z.object({
    id: z.number().optional(),
    entryType: z.string(),
    amount: z.number().positive().multipleOf(0.01),
    description: z.string().min(1),
    date: z.string(),
    account: z
      .number()
      .refine(
        (value) =>
          accountFetch.value.accounts.some((account) => account.id === value),
        {},
      ),
    household: z.number().optional().nullable(),
    category: z
      .number()
      .refine(
        (value) =>
          categories.value.categories.some((category) => category.id === value),
        {},
      ),
  }),
);

// Form setup
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    entryType: "expense", // Pre-select here
    date: new Date().toISOString().split("T")[0],
    account:
      accountFetch.value.accounts.find((account) => account.default)?.id ||
      accountFetch.value.accounts[0]?.id,
  },
});

// Form submission
const formSubmit = form.handleSubmit(async (values) => {
  const submitData = {
    ...values,
    date: new Date(values.date).toISOString(),
  };

  const newEntry: IEntryForm = {
    id: null,
    account: submitData.account,
    amount: submitData.amount,
    category: submitData.category,
    date: submitData.date,
    description: submitData.description,
    entryType: submitData.entryType,
    household: submitData?.household || null,
  };

  await storeEntry(newEntry);

  toast({
    description: "Your entry has been added successfully.",
  });

  form.resetForm({
    values: {
      entryType: "expense",
      date: new Date().toISOString().split("T")[0],
      account:
        accountFetch.value.accounts.find((account) => account.default)?.id ||
        accountFetch.value.accounts[0]?.id,
      category: categories.value.categories.find(
        (category) => category.name === "Uncategorized",
      )?.id,
      description: "",
      amount: undefined,
    },
  });

  toast({
    description: "Your entry has been added successfully.",
  });
});

// Retrieve accounts
const getAccounts = async () => {
  await fetchAccounts();
  form.setFieldValue(
    "account",
    accountFetch.value.accounts.find((account) => account.default)?.id ||
      accountFetch.value.accounts[0].id,
  );
};

// Retrieve categories
const getCategories = async () => {
  await fetchCategories();
  form.setFieldValue(
    "category",
    categories.value.categories.find(
      (category) => category.name === "Uncategorized",
    )?.id,
  );
};

// The fetch should be called on mount
onMounted(async () => {
  await Promise.all([
    getAccounts(),
    getCategories(),
    fetchHouseholds(),
    getCategories(),
  ]);
});

const entryTypes = [
  { value: "income", label: "Income", disabled: false },
  { value: "expense", label: "Expense", disabled: false },
];

const buildAccountName = (account: IAccount): string => {
  return `${account.name} (${account.currency} ${account.balance})`;
};

const categoryOptions = computed<SelectOption[]>(() =>
  categories.value.categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  })),
);

const accountOptions = computed<SelectOption[]>(() =>
  accountFetch.value.accounts.map((it) => ({
    value: it.id,
    label: buildAccountName(it),
  })),
);
</script>

<template>
  <form @submit="formSubmit">
    <input type="hidden" name="entryType" v-model="form.values.id" />
    <FormSelect
      name="entryType"
      label="Entry Type"
      placeholder="Select type of expense"
      :items="entryTypes"
      class="w-full"
    />

    <FormField v-slot="{ componentField }" name="date">
      <FormItem class="mt-4">
        <FormLabel>Date</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="date" class="w-full" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormSelect
      name="account"
      label="Account"
      placeholder=""
      :items="accountOptions"
      :isLoading="accountFetch.isLoading"
      :error="accountFetch.error"
      class="mt-4"
    />

    <FormSelect
      name="category"
      label="Category"
      placeholder=""
      :items="categoryOptions"
      :isLoading="categories.isLoading"
      :error="categories.error"
      class="mt-4"
    />

    <FormSelect
      name="household"
      label="Household"
      placeholder="Select a household (optional)"
      :items="householdOptions"
      :isLoading="householdFetch.isLoading"
      :error="householdFetch.error"
      class="mt-4"
    />

    <FormField v-slot="{ componentField }" name="amount">
      <FormItem class="mt-4">
        <FormLabel>Amount</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            step="0.01"
            type="number"
            class="w-full"
          />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem class="mt-4">
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" class="w-full" />
        </FormControl>
      </FormItem>
    </FormField>

    <Button
      variant="default"
      type="submit"
      class="mt-4"
      :disabled="categories.isLoading || accountFetch.isLoading"
    >
      <Spinner
        v-if="
          categories.isLoading || accountFetch.isLoading || entryStore.isLoading
        "
      />
      <span v-else>Submit</span>
    </Button>
  </form>
</template>
