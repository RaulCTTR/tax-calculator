import { useState } from "react";
import { api } from "@hooks/useLazyApi";

interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

interface TaxBracketsResponse {
  tax_brackets: TaxBracket[];
}

interface TaxCalculation {
  totalTax: number;
  taxPerBracket: {
    bracket: TaxBracket;
    taxAmount: number;
    incomeBracket: number;
  }[];
  effectiveRate: number;
}

interface UseTaxCalculationHook extends Partial<TaxCalculation> {
  loading: boolean;
  error: Error | null;
  calculateTax: ({
    annualIncom,
    taxYear,
  }: {
    annualIncom: number;
    taxYear: number;
  }) => void;
}

export function useTaxCalculator(): UseTaxCalculationHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculation | null>(
    null
  );

  async function calculateTax({
    annualIncom,
    taxYear,
  }: {
    annualIncom: number;
    taxYear: number;
  }) {
    try {
      setLoading(true);
      const response = await api.get<TaxBracketsResponse>(
        `/tax-calculator/tax-year/${taxYear}`
      );
      const taskBrackets: TaxBracket[] = response.data.tax_brackets;

      let totalTax = 0;
      const taxPerBracket = [];

      for (let index = 0; index < taskBrackets.length; index++) {
        const bracket = taskBrackets[index];

        const bracketMin = bracket.min;
        const bracketMax = bracket.max ?? Infinity;

        if (annualIncom < bracketMin) {
          break;
        }

        const incomeBracket = Math.min(
          annualIncom - bracketMin,
          bracketMax - bracketMin
        );
        const taxAmount = incomeBracket * bracket.rate;

        totalTax = totalTax + taxAmount;
        taxPerBracket.push({ bracket, taxAmount, incomeBracket });
      }

      const effectiveRate = (totalTax / annualIncom) * 100;

      setTaxCalculation({
        totalTax,
        taxPerBracket,
        effectiveRate,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error as Error);
    }
  }

  return { ...taxCalculation, calculateTax, loading, error };
}
