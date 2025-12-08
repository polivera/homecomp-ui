import { logger } from "@/lib/logger";
import { ref } from "vue";

export interface IEntryForm {
  id: number | null;
  account: number;
  category: number;
  household: number | null;
  date: string;
  description: string;
  amount: number;
  entryType: string;
}

interface IEntryStore {
  isLoading: boolean;
  error: string | null;
}

export const entryStore = ref<IEntryStore>({
  isLoading: false,
  error: null,
})

export const storeEntry = async (entry: IEntryForm) => {
  entryStore.value.isLoading = true
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 550)
    })
    logger.info('Saving entry...')
    logger.debug(entry)
  } catch (saveError) {
    entryStore.value.error = 'Failed to save entry'
    logger.error(saveError)
  } finally {
    entryStore.value.isLoading = false
  }
}
