enum InterestPaymentFrequency {
  Monthly = "monthly",
  Quarterly = "quarterly",
  Yearly = "yearly",
  AtMaturity = "atMaturity",
}

const getInterestCompoundingFrequency = (
  interestPaymentFrequency: InterestPaymentFrequency,
  investmentTermInYears: number
): number => {
  const frequencyMap: Record<
    InterestPaymentFrequency,
    number | ((termInYears: number) => number)
  > = {
    [InterestPaymentFrequency.Monthly]: 12,
    [InterestPaymentFrequency.Quarterly]: 4,
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

const calculateInvestmentTermInYears = (endDateInput: MonthInput): number => {
  const startDate = new Date();
  const endDate = new Date(endDateInput);
  const investmentTermInMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  return investmentTermInMonths / 12;
};

const calculateFinalBalance = (
  initialDeposit: number,
  endDateInput: MonthInput,
  annualInterestRate: number,
  interestPaymentFrequency: InterestPaymentFrequency
): string => {
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
