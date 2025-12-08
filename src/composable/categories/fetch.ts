import { logger } from "@/lib/logger";
import { generateCategories } from "./mock";
import type { ICategory } from "./types";

export const fetchCategories = async (): Promise<ICategory[]> => {
  logger.info('Fetching categorires')
  await new Promise((resolve) => {
    setTimeout(resolve, 592);
  });
  const results = generateCategories(9)
  logger.debug(results);
  return results
}
