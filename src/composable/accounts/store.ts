import type { Ref } from "vue";
import type { IAccountForm, IAccountStore } from "./types";
import { logger } from "@/lib/logger";



export const saveAccount = async (accountStore: Ref<IAccountStore>, account: IAccountForm): Promise<void> => {
  accountStore.value.isLoading = true;
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });
    logger.info('Saving account...')
    logger.debug(account)
  } catch (saveError) {
    accountStore.value.error = 'Failed to store the acccount'
    logger.error(saveError)
  } finally {
    accountStore.value.isLoading = false;
  }
}

