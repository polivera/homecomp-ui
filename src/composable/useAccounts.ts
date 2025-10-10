import {computed, ref} from "vue";

export interface Account {
    id: number
    name: string;
    currency: string;
    balance: number;
    default: boolean;
    owned: boolean;
}

const isLoading = ref<boolean>(false)
const accounts = ref<Account[]>([])
const error = ref<string | null>(null)

const fetchAccounts = async (): Promise<void> => {
    isLoading.value = true

    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })

        accounts.value = [
            {
                id: 1,
                name: 'Test Account',
                currency: 'USD',
                balance: 1000,
                default: false,
                owned: true,
            },
            {
                id: 2,
                name: 'Test Account 2',
                currency: 'EUR',
                balance: 2000,
                default: true,
                owned: true,
            },
            {
                id: 3,
                name: 'Test Account 3',
                currency: 'EUR',
                balance: 3501,
                default: false,
                owned: false,
            }
        ]
    } catch (fetchError) {
        error.value = 'Failed to fetch accounts'
    } finally {
        isLoading.value = false
    }
}

export const useAccounts = () => {
    return {
        isLoading: computed(() => isLoading.value),
        accounts: computed(() => accounts.value),
        error: computed(() => error.value),
        fetchAccounts
    };
}