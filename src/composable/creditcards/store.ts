import { type Ref } from "vue";
import type { ICreditCardEntryForm, ICreditCardEntryStore } from "./types";
import { logger } from "@/lib/logger";

export const storeCreditCardEntry = async (creditCardEntryStore: Ref<ICreditCardEntryStore>, creditCardEntry: ICreditCardEntryForm) => {
  creditCardEntryStore.value.isLoading = true;
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 550);
    });
    logger.info('Saving credit card entry...')
    logger.debug(creditCardEntry);
  } catch (saveError) {
    creditCardEntryStore.value.error = 'Failed to save credit card entry';
    logger.error(saveError)
  } finally {
    creditCardEntryStore.value.isLoading = false;
  }
}
