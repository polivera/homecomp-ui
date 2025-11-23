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
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { onMounted, ref } from "vue";
import { useReminders } from "@/composable/reminders";
import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";
import { useForm } from "vee-validate";
import { useReminderInterval } from "@/composable/useReminderInterval";

const props = defineProps<{
    reminderID: string;
}>();

const { formatMoney } = useCurrency();
const { detailData: reminderData, detail: reminderFetch } = useReminders();
const { getIntervalText } = useReminderInterval();

const dialogOpen = ref(false);

const formSchema = toTypedSchema(
    z.object({
        amount: z.number().positive().multipleOf(0.01),
        date: z.string(),
    }),
);

const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        amount: 0,
    },
});

const formSubmit = form.handleSubmit(async (values) => {
    console.log("form submitted");
    console.log(values);
    // TODO: actual submission logic here
    dialogOpen.value = false;
});

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
                    <CardDescription v-if="reminderData.data.household">
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

            <Dialog v-model:open="dialogOpen">
                <DialogTrigger as-child>
                    <Button class="w-full"> Pay </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                    <form @submit="formSubmit">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Pay current reminder to convert it to entry
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-4">
                            <FormField
                                v-slot="{ componentField }"
                                name="amount"
                            >
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
                            <FormField v-slot="{ componentField }" name="date">
                                <FormItem class="mt-4">
                                    <FormLabel>
                                        Start Date
                                        <span class="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            v-bind="componentField"
                                            type="date"
                                            class="w-full"
                                        />
                                    </FormControl>
                                </FormItem>
                            </FormField>
                        </div>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button variant="outline"> Cancel </Button>
                            </DialogClose>
                            <Button type="submit"> Save changes </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </CardContent>
    </Card>
</template>
