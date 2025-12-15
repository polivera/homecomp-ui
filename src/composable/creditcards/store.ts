import { type Ref } from "vue";
import type { ICreditCardEntryForm, ICreditCardEntryStore, ICreditCardForm, ICreditCardStore } from "./types";
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

export const storeCreditCard = async (creditCardStore: Ref<ICreditCardStore>, creditCard: ICreditCardForm) => {
  creditCardStore.value.isLoading = true;
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 550);
    });
    logger.info('Saving credit card...')
    logger.debug(creditCard);
  } catch (saveError) {
    creditCardStore.value.error = 'Failed to save credit card';
    logger.error(saveError)
  } finally {
    creditCardStore.value.isLoading = false;
  }
}
