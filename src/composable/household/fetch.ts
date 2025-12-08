import { logger } from "@/lib/logger";
import { generateHouseholds } from "./mock";
import type { IHousehold } from "./types";

export const fetchHouseholds = async (): Promise<IHousehold[]> => {
  logger.debug('Fetching households')
  await new Promise((resolve) => {
    setTimeout(resolve, 750);
  });
  const result = generateHouseholds(3);
  logger.debug('Household fetched')
  logger.debug(result)
  return result
}
