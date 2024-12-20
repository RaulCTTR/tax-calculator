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
        <label htmlFor="income">
          {STRINGS_DICTIONARY.LABELS.ANNUAL_INCOME}
        </label>
        <div className="tax-form--currency-input">
          <span className="tax-form--currency-symbol">$</span>
          <input
            id="income"
            {...register("annualIncom", { valueAsNumber: true })}
            type="number"
            placeholder={STRINGS_DICTIONARY.PLACE_HOLDERS.ANNUAL_INCOME}
            disabled={loading}
          />
        </div>

        <AlertError message={errors.annualIncom?.message} />
      </div>

      <div className="tax-form--input-group">
        <label htmlFor="year">{STRINGS_DICTIONARY.LABELS.TOTAL_TAX}</label>
        <input
          id="year"
          {...register("taxYear", { valueAsNumber: true })}
          type="number"
          placeholder={STRINGS_DICTIONARY.PLACE_HOLDERS.TAX_YEAR}
          disabled={loading}
        />
        <AlertError message={errors.taxYear?.message} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="tax-form--submit-button"
      >
        {STRINGS_DICTIONARY.BUTTONS.CALCULATE}
      </button>
    </form>
  );
}

export default TaxForm;
