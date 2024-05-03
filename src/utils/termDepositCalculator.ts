const MONTHS_IN_YEAR = 12;
const QUARTERS_IN_YEAR = 4;

enum InterestPaymentFrequency {
  Monthly = "monthly",
  Quarterly = "quarterly",
  Yearly = "yearly",
  AtMaturity = "atMaturity",
}
/**
 * Determines the frequency of interest compounding based on the payment frequency and investment term.
 */
const getInterestCompoundingFrequency = (
  interestPaymentFrequency: InterestPaymentFrequency,
  investmentTermInYears: number
): number => {
  const frequencyMap: Record<
    InterestPaymentFrequency,
    number | ((termInYears: number) => number)
  > = {
    [InterestPaymentFrequency.Monthly]: MONTHS_IN_YEAR,
    [InterestPaymentFrequency.Quarterly]: QUARTERS_IN_YEAR,
    [InterestPaymentFrequency.Yearly]: 1,
    [InterestPaymentFrequency.AtMaturity]: (termInYears: number) =>
      1 / termInYears,
  };

  const frequency = frequencyMap[interestPaymentFrequency];

  if (typeof frequency === "function") {
    return frequency(investmentTermInYears);
  }

  if (frequency) {
    return frequency;
  }

  throw new Error("Invalid interest payment frequency");
};

/**
 * Calculates the compound interest for a given investment.
 *
 * A = P * (1 + r/n)^(nt)
 * Where:
 * A is the amount of money accumulated after n years, including interest.
 * P is the principal amount (the initial sum of money).
 * r is the annual interest rate (decimal).
 * n is the number of times that interest is compounded per year.
 * t is the number of years the money is invested or borrowed for.
 */
const calculateCompoundInterest = (
  principal: number,
  annualInterestRate: number,
  compoundingFrequency: number,
  investmentTermInYears: number
): number => {
  const interestRatePerPeriod = annualInterestRate / compoundingFrequency;
  const numberOfCompoundingPeriods =
    compoundingFrequency * investmentTermInYears;

  return (
    principal * Math.pow(1 + interestRatePerPeriod, numberOfCompoundingPeriods)
  );
};

/**
 * Calculates the term of the investment in years from the current date to the given end date.
 */
const calculateInvestmentTermInYears = (endDateInput: MonthInput): number => {
  const startDate = new Date();
  const endDate = new Date(endDateInput);
  const investmentTermInMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * MONTHS_IN_YEAR +
    (endDate.getMonth() - startDate.getMonth());

  if (investmentTermInMonths <= 0) {
    throw new Error(
      "End date cannot be before or the same as the current date"
    );
  }

  return investmentTermInMonths / MONTHS_IN_YEAR;
};

const validateInputs = (
  initialDeposit: number,
  endDateInput: MonthInput,
  annualInterestRate: number
): void => {
  if (initialDeposit <= 0 || isNaN(initialDeposit)) {
    throw new Error("Initial deposit must be a positive number");
  }

  if (!endDateInput) {
    throw new Error("End date is required");
  }

  if (isNaN(annualInterestRate)) {
    throw new Error("Annual interest rate must be a valid number");
  }
};

/**
 * Calculates the final balance of the investment including compound interest.
 * @param {number} initialDeposit - The initial deposit amount.
 * @param {MonthInput} endDateInput - The end date of the investment.
 * @param {number} annualInterestRate - The annual interest rate.
 * @param {InterestPaymentFrequency} interestPaymentFrequency - The frequency at which interest is paid.
 * @returns {string} The final balance formatted as a string with two decimal places.
 */
const calculateFinalBalance = (
  initialDeposit: number,
  endDateInput: MonthInput,
  annualInterestRate: number,
  interestPaymentFrequency: InterestPaymentFrequency
): string => {
  validateInputs(initialDeposit, endDateInput, annualInterestRate);
  const investmentTermInYears = calculateInvestmentTermInYears(endDateInput);
  const interestCompoundingFrequency = getInterestCompoundingFrequency(
    interestPaymentFrequency,
    investmentTermInYears
  );

  const decimalInterestRate = annualInterestRate / 100;

  const finalBalance = calculateCompoundInterest(
    initialDeposit,
    decimalInterestRate,
    interestCompoundingFrequency,
    investmentTermInYears
  );

  return finalBalance.toFixed(2);
};

export type MonthInput = string;
export { calculateFinalBalance, InterestPaymentFrequency };
