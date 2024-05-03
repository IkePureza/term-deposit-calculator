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

const calculateFinalBalance = (
  initialDeposit: number,
  investmentTermInYears: number,
  annualInterestRate: number,
  interestPaymentFrequency: InterestPaymentFrequency
): string => {
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

export { calculateFinalBalance, InterestPaymentFrequency };
