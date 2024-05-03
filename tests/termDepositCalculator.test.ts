import { describe, expect, it } from "vitest";
import { calculateFinalBalance } from "../utils/termDepositCalculator";

describe("Calculate final balance", () => {
  it("calculates final balance with monthly interest payments", () => {
    const startDeposit = 10000;
    const investmentTermInYears = 3;
    const interestRate = 1.1;

    expect(
      calculateFinalBalance(startDeposit, investmentTermInYears, interestRate)
    ).toBe("10335.35");
  });
});
