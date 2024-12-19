import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaxForm from "./TaxForm";

describe("<TaxForm/>", () => {
  const mockOnSubmit = vi.fn();
  const currentYear = 2024;

  const setup = () => {
    render(<TaxForm onSubmit={mockOnSubmit} loading={false} />);
    return {
      annualIncomeInput: screen.getByPlaceholderText("Annual Income"),
      taxYearInput: screen.getByPlaceholderText("Tax year"),
      submitButton: screen.getByText("Calculate"),
    };
  };

  it("should show error for negative annual income", async () => {
    const { annualIncomeInput, submitButton } = setup();

    await userEvent.type(annualIncomeInput, "-1000");
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Expected number, received nan")
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should show error for invalid tax year (before 1900)", async () => {
    const { taxYearInput, submitButton } = setup();
    console.log("[]", taxYearInput);
    await userEvent.type(taxYearInput, "2493");
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Tax year cannot be in the future")
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should show error for future tax year", async () => {
    const { taxYearInput, submitButton } = setup();

    await userEvent.type(taxYearInput, `${currentYear + 2}`);
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Tax year cannot be in the future")
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shouldnt submit form with invalid data", async () => {
    const { annualIncomeInput, taxYearInput, submitButton } = setup();

    await userEvent.type(annualIncomeInput, "-50000");
    await userEvent.type(taxYearInput, "2465");
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(0);
  });

  it("should disable submit button when loading", () => {
    render(<TaxForm onSubmit={mockOnSubmit} loading={true} />);

    const submitButton = screen.getByText("Calculate");
    expect(submitButton).toBeDisabled();
  });
});
