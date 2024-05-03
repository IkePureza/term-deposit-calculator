const getInterestCompoundingFrequency = (): number => {
  return 12;
};

const calculateFinalBalance = (
  initialDeposit: number,
  investmentTermInYears: number,
  annualInterestRate: number
): string => {
  const interestCompoundingFrequency = getInterestCompoundingFrequency();

  const decimalInterestRate = annualInterestRate / 100;

  const finalBalance =
    initialDeposit *
    Math.pow(
      1 + decimalInterestRate / interestCompoundingFrequency,
      interestCompoundingFrequency * investmentTermInYears
    );

  return finalBalance.toFixed(2);
};

export { calculateFinalBalance };
