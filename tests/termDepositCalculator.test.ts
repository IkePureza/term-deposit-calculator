import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  calculateFinalBalance,
  InterestPaymentFrequency,
} from "../utils/termDepositCalculator";

// Fixed date for setting the system time
const FIXED_DATE = "2023-05-01";

describe("Calculate final balance", () => {
  beforeEach(() => {
    const fixedDate = new Date(FIXED_DATE);
    vi.useFakeTimers();
    vi.setSystemTime(fixedDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });
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

  it("calculates final balance with zero interest rate", () => {
    const startDeposit = 20000;
    const investmentTermInYears = 3;
    const interestRate = 0;
    const interestPaid = InterestPaymentFrequency.Monthly;

    expect(
      calculateFinalBalance(
        startDeposit,
        investmentTermInYears,
        interestRate,
        interestPaid
      )
    ).toBe("20000.00");
  });
});
