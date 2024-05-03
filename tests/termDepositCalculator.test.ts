import { describe, expect, it } from "vitest";
import {
  calculateFinalBalance,
  InterestPaymentFrequency,
} from "../utils/termDepositCalculator";

describe("Calculate final balance", () => {
  it("calculates final balance with monthly interest payments", () => {
    const startDeposit = 10000;
    const investmentTermInYears = 3;
    const interestRate = 1.1;
    const interestPaymentFrequency = InterestPaymentFrequency.Monthly;

    expect(
      calculateFinalBalance(
        startDeposit,
        investmentTermInYears,
        interestRate,
        interestPaymentFrequency
      )
    ).toBe("10335.35");
  });

  it("calculates final balance with interest paid at maturity", () => {
    const startDeposit = 10000;
    const investmentTermInYears = 3;
    const interestRate = 1.1;
    const interestPaymentFrequency = InterestPaymentFrequency.AtMaturity;

    expect(
      calculateFinalBalance(
        startDeposit,
        investmentTermInYears,
        interestRate,
        interestPaymentFrequency
      )
    ).toBe("10330.00");
  });
});
