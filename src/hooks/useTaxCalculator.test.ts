import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useTaxCalculator } from "@hooks/useTaxCalculator";
import { api } from "@hooks/useLazyApi";

const mockTaxBrackets = {
  tax_brackets: [
    { min: 0, max: 50197, rate: 0.15 },
    { min: 50197, max: 100392, rate: 0.205 },
    { min: 100392, max: 155625, rate: 0.26 },
    { min: 155625, max: 221708, rate: 0.29 },
    { min: 221708, rate: 0.33 },
  ],
};

describe("useTaxCalculator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initilize default values", () => {
    const { result } = renderHook(() => useTaxCalculator());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.totalTax).toBeUndefined();
    expect(result.current.taxPerBracket).toBeUndefined();
    expect(result.current.effectiveRate).toBeUndefined();
  });

  it("should calculate correctly the taxes for an annual income of $50000", async () => {
    vi.spyOn(api, "get").mockResolvedValue({
      data: mockTaxBrackets,
    });

    const { result } = renderHook(() => useTaxCalculator());

    result.current.calculateTax({ annualIncom: 50000, taxYear: 2022 });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(null);
    expect(result.current.totalTax).toBeCloseTo(7500, 2);
    expect(result.current.effectiveRate).toBeCloseTo(15, 2);
    expect(result.current.taxPerBracket?.length).toBe(1);
  });
});
