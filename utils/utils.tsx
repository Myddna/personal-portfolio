/**
 * Computes the amount of whole years that have passed between two provided dates
 * @param startDate Start of the interval
 * @param endDate End of the interval
 * @returns years passed between two dates, rounded down
 */
export const yearsPassed = (startDate: Date, endDate: Date) => {
  return Math.floor((endDate.getTime() - startDate.getTime()) / 31536000000);
};
