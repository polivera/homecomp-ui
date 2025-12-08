import type { Ref } from "vue";
import type { IHouseholdForm, IHouseholdStore } from "./types";
import { logger } from "@/lib/logger";

export const storeHousehold = async (householdStore: Ref<IHouseholdStore>, household: IHouseholdForm) => {
  householdStore.value.isLoading = true;
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });
    logger.info('Saving household...')
    logger.debug(household);
  } catch (saveError) {
    householdStore.value.error = 'Failed to save household';
    logger.error(saveError)
  } finally {
    householdStore.value.isLoading = false;
  }
}
