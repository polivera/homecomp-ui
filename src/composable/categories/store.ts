import type { Ref } from "vue";
import type { ICategoryForm, ICategoryStore } from "./types";
import { logger } from "@/lib/logger";

export const storeCategory = async (categoryStore: Ref<ICategoryStore>, category: ICategoryForm) => {
  categoryStore.value.isLoading = true;
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });
    logger.info('Saving category...')
    logger.debug(category)
  } catch (saveError) {
    categoryStore.value.error = 'Failed to save category';
    logger.error(saveError)
  } finally {
    categoryStore.value.isLoading = false;
  }
}
