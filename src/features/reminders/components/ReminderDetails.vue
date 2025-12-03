/** */
<script setup lang="ts">
import { useCurrency } from "@/composable/useCurrency";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { onMounted } from "vue";
import { useReminders } from "@/composable/reminders";
import { useReminderInterval } from "@/composable/useReminderInterval";
import ReminderPayForm from "./ReminderPayForm.vue";

const props = defineProps<{
  reminderID: string;
}>();

const { formatMoney } = useCurrency();
const { detailData: reminderData, detail: reminderFetch } = useReminders();
const { getIntervalText } = useReminderInterval();

const handlePaySubmit = (values: {
  amount: number;
  date: string;
  account: number;
}) => {
  console.log("form submitted");
  console.log(values);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// TODO: Load details
onMounted(async () => {
  console.log("fetching data " + props.reminderID);
  await reminderFetch(props.reminderID);
  console.log(reminderData.value.data);
});
</script>

<template>
  <Card v-if="reminderData.data">
    <CardHeader>
      <div class="flex justify-between items-start">
        <div>
          <CardTitle class="text-xl">{{
            reminderData.data.description
          }}</CardTitle>
          <CardDescription v-if="reminderData.data.household">
            <strong>Household:</strong>
            {{ reminderData.data.householdName }}
          </CardDescription>
        </div>
        <Badge variant="outline">{{ reminderData.data.categoryName }}</Badge>
      </div>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="text-3xl font-bold">
        {{ formatMoney(reminderData.data.amount, reminderData.data.currency) }}
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-gray-500">Frequency</span>
          <p class="font-medium">
            {{
              getIntervalText(
                reminderData.data.interval,
                reminderData.data.intervalUnit,
              )
            }}
          </p>
        </div>
        <div v-if="reminderData.data.household">
          <span class="text-gray-500">Owner</span>
          <p class="font-medium">{{ reminderData.data.ownerName }}</p>
        </div>
        <div>
          <span class="text-gray-500">Start Date</span>
          <p class="font-medium">
            {{ formatDate(reminderData.data.dateStart) }}
          </p>
        </div>
        <div>
          <span class="text-gray-500">Next Due Date</span>
          <p class="font-medium">
            {{ formatDate(reminderData.data.dateNextDue) }}
          </p>
        </div>
        <div>
          <span class="text-gray-500">End Date</span>
          <p class="font-medium">
            {{
              reminderData.data.dateEnd
                ? formatDate(reminderData.data.dateEnd)
                : "No end date"
            }}
          </p>
        </div>
      </div>

      <ReminderPayForm
        :default-amount="reminderData.data.amount"
        :pay-currency="reminderData.data.currency"
        @submit="handlePaySubmit"
      />
    </CardContent>
  </Card>
</template>
