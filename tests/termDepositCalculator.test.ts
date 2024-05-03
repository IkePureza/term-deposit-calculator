import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  calculateFinalBalance,
  InterestPaymentFrequency,
} from "../src/utils/termDepositCalculator";

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
    const endMonth = "2026-05";
    const interestRate = 1.1;
    const interestPaymentFrequency = InterestPaymentFrequency.Monthly;

    expect(
      calculateFinalBalance(
        startDeposit,
        endMonth,
        interestRate,
        interestPaymentFrequency
      )
    ).toBe("10335.35");
  });

  it("calculates final balance with interest paid at maturity", () => {
    const startDeposit = 10000;
    const endMonth = "2026-05";
    const interestRate = 1.1;
    const interestPaymentFrequency = InterestPaymentFrequency.AtMaturity;

    expect(
      calculateFinalBalance(
        startDeposit,
        endMonth,
        interestRate,
        interestPaymentFrequency
      )
    ).toBe("10330.00");
  });

  it("calculates final balance with zero interest rate", () => {
    const startDeposit = 20000;
    const endMonth = "2026-05";
    const interestRate = 0;
    const interestPaid = InterestPaymentFrequency.Monthly;

    expect(
      calculateFinalBalance(startDeposit, endMonth, interestRate, interestPaid)
    ).toBe("20000.00");
  });
});
