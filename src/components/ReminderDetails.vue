<script setup lang="ts">
import { useCurrency } from "@/composable/useCurrency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { onMounted, ref, watch } from "vue";
import { useReminders } from "@/composable/reminders";
import { useEntries } from "@/composable/entries/useEntry";

const props = defineProps<{
    reminderID: string;
}>();

const { formatMoney } = useCurrency();
const { detailData: reminderData, detail: reminderFetch } = useReminders();
const { storeEntry, entryStore } = useEntries();

const isPaySheetOpen = ref(false);
const paymentAmount = ref(0);

watch(
    () => reminderData.value.data?.amount,
    (newAmount) => {
        if (newAmount) {
            paymentAmount.value = newAmount;
        }
    }
);

const openPaySheet = () => {
    if (reminderData.value.data) {
        paymentAmount.value = reminderData.value.data.amount;
    }
    isPaySheetOpen.value = true;
};

const handlePay = async () => {
    if (!reminderData.value.data) return;

    await storeEntry({
        id: null,
        account: 1, // TODO: make configurable or get from context
        category: reminderData.value.data.category,
        household: reminderData.value.data.household,
        date: new Date().toISOString().split("T")[0],
        description: reminderData.value.data.description,
        amount: paymentAmount.value,
        entryType: "expense",
    });

    isPaySheetOpen.value = false;
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

// TODO: use useLapse
const formatLapse = (days: number): string => {
    if (days === 1) return "Daily";
    if (days === 7) return "Weekly";
    if (days === 14) return "Every 2 weeks";
    if (days === 30) return "Monthly";
    if (days === 60) return "Every 2 months";
    if (days === 90) return "Quarterly";
    if (days === 365) return "Yearly";
    return `Every ${days} days`;
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
                    <CardDescription v-if="reminderData.data.householdName">
                        <strong>Household:</strong>
                        {{ reminderData.data.householdName }}
                    </CardDescription>
                </div>
                <Badge variant="outline">{{
                    reminderData.data.categoryName
                }}</Badge>
            </div>
        </CardHeader>
        <CardContent class="space-y-4">
            <div class="text-3xl font-bold">
                {{
                    formatMoney(
                        reminderData.data.amount,
                        reminderData.data.currency,
                    )
                }}
            </div>

            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span class="text-gray-500">Frequency</span>
                    <p class="font-medium">
                        {{ formatLapse(reminderData.data.lapse) }}
                    </p>
                </div>
                <div>
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

            <div class="pt-4">
                <Button @click="openPaySheet" class="w-full">
                    Pay
                </Button>
            </div>
        </CardContent>
    </Card>

    <Sheet v-model:open="isPaySheetOpen">
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Pay Reminder</SheetTitle>
                <SheetDescription>
                    {{ reminderData.data?.description }}
                </SheetDescription>
            </SheetHeader>

            <div class="py-6 space-y-4">
                <div>
                    <label class="text-sm font-medium">Amount</label>
                    <Input
                        v-model.number="paymentAmount"
                        type="number"
                        step="0.01"
                        class="mt-1"
                    />
                </div>
            </div>

            <SheetFooter>
                <Button
                    variant="outline"
                    @click="isPaySheetOpen = false"
                >
                    Cancel
                </Button>
                <Button
                    @click="handlePay"
                    :disabled="entryStore.isLoading"
                >
                    {{ entryStore.isLoading ? "Saving..." : "Confirm Payment" }}
                </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>
