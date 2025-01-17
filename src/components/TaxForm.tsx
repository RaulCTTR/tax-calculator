import "./TaxForm.style.css";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AlertMessage from "@components/AlertMessage";

import { STRINGS_DICTIONARY } from "@utils/strings";
import { APP_CONSTS } from "@utils/consts";

const AlertError = AlertMessage.Error;
const { ANNUAL_INCOME_MIN, ANNUAL_INCOME_MAX, TAX_YEAR_MIN, TAX_YEAR_MAX } =
  APP_CONSTS;

const taxFormSchema = z.object({
  annualIncom: z
    .number()
    .min(ANNUAL_INCOME_MIN, STRINGS_DICTIONARY.ERRORS.ANNUAL_INCOME_NEGATIVE)
    .max(ANNUAL_INCOME_MAX, STRINGS_DICTIONARY.ERRORS.ANNUAL_INCOME_LARGE),
  taxYear: z
    .number()
    .min(TAX_YEAR_MIN, STRINGS_DICTIONARY.ERRORS.TAX_YEAR_LOWER)
    .max(TAX_YEAR_MAX, STRINGS_DICTIONARY.ERRORS.TAX_YEAR_LARGE),
});

type TaxFormValues = z.infer<typeof taxFormSchema>;

interface TaxFormProps {
  onSubmit: (values: TaxFormValues) => void;
  loading: boolean;
}

function TaxForm({ onSubmit, loading }: TaxFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxFormValues>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: { annualIncom: 0, taxYear: new Date().getFullYear() },
  });

  const onSubmitForm: SubmitHandler<TaxFormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form className="tax-form" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="tax-form--input-group">
        <div
          className={`tax-form--input-wrapper ${
            errors.annualIncom?.message ? "tax-form--error" : ""
          }`}
        >
          <label htmlFor="income">
            {STRINGS_DICTIONARY.LABELS.ANNUAL_INCOME}
          </label>
          <div className="tax-form--currency-input">
            <span className="tax-form--currency-symbol">$</span>
            <input
              data-testid="annualIncom"
              id="income"
              {...register("annualIncom", { valueAsNumber: true })}
              type="number"
              placeholder={STRINGS_DICTIONARY.PLACE_HOLDERS.ANNUAL_INCOME}
              disabled={loading}
            />
          </div>

          <AlertError message={errors.annualIncom?.message} />
        </div>
      </div>

      <div
        className={`tax-form--input-wrapper ${
          errors.taxYear?.message ? "tax-form--error" : ""
        }`}
      >
        <div className="tax-form--input-group">
          <label htmlFor="year">{STRINGS_DICTIONARY.LABELS.TOTAL_TAX}</label>
          <select
            id="year"
            data-testid="taxYear"
            {...register("taxYear", { valueAsNumber: true })}
            disabled={loading}
          >
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
            <option value={2020}>2020</option>
            <option value={2019}>2019</option>
          </select>
          <AlertError message={errors.taxYear?.message} />
        </div>
      </div>

      <div className="tax-form--button-container">
        <button
          type="submit"
          disabled={loading}
          className="tax-form--submit-button"
        >
          {STRINGS_DICTIONARY.BUTTONS.CALCULATE}
        </button>
      </div>
    </form>
  );
}

export default TaxForm;
