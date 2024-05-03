import React, { useState, useMemo } from "react";
import {
  calculateFinalBalance,
  InterestPaymentFrequency,
  MonthInput,
} from "./utils/termDepositCalculator";

const App: React.FC = () => {
  const [startDeposit, setStartDeposit] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(1.1);
  const [endMonth, setEndMonth] = useState<MonthInput>(
    new Date().toISOString().slice(0, 7)
  );
  const [interestPaid, setInterestPaid] = useState<InterestPaymentFrequency>(
    InterestPaymentFrequency.AtMaturity
  );
  const [error, setError] = useState<string>("");

  const finalBalance = useMemo(() => {
    try {
      const calculatedBalance = calculateFinalBalance(
        startDeposit,
        endMonth,
        interestRate,
        interestPaid
      );
      setError("");
      return calculatedBalance;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      return "";
    }
  }, [startDeposit, endMonth, interestRate, interestPaid]);

  return (
    <div className="App">
      <h1>Term Deposit Calculator</h1>
      <div>
        <div>
          <label htmlFor="startDeposit">Start Deposit Amount ($):</label>
          <input
            id="startDeposit"
            type="number"
            step="500"
            value={startDeposit}
            onChange={(e) => setStartDeposit(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="interestRate">Annual Interest Rate (%):</label>
          <input
            id="interestRate"
            type="number"
            step="1"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="endMonth">Investment Term End Month:</label>
          <input
            id="endMonth"
            type="month"
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="interestPaid">Interest Payment Frequency:</label>
          <select
            id="interestPaid"
            value={interestPaid}
            onChange={(e) =>
              setInterestPaid(e.target.value as InterestPaymentFrequency)
            }
          >
            <option value={InterestPaymentFrequency.Monthly}>Monthly</option>
            <option value={InterestPaymentFrequency.Quarterly}>
              Quarterly
            </option>
            <option value={InterestPaymentFrequency.Yearly}>Annually</option>
            <option value={InterestPaymentFrequency.AtMaturity}>
              At Maturity
            </option>
          </select>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      {finalBalance && <p className="result">Final Balance: ${finalBalance}</p>}
    </div>
  );
};

export default App;
