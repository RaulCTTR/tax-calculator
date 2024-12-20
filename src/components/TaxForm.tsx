import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AlertMessage from "@components/AlertMessage";

import { STRINGS_DICTIONARY } from "@utils/strings";

const AlertError = AlertMessage.Error;

const taxFormSchema = z.object({
  annualIncom: z
    .number()
    .min(0, STRINGS_DICTIONARY.ERRORS.ANNUAL_INCOME_NEGATIVE)
    .max(99999999999999, STRINGS_DICTIONARY.ERRORS.ANNUAL_INCOME_LARGE),
  taxYear: z
    .number()
    .min(1900, STRINGS_DICTIONARY.ERRORS.TAX_YEAR_LOWER)
    .max(
      new Date().getFullYear() + 1,
      STRINGS_DICTIONARY.ERRORS.TAX_YEAR_LARGE
    ),
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
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <input
          {...register("annualIncom", { valueAsNumber: true })}
          type="number"
          placeholder={STRINGS_DICTIONARY.PLACE_HOLDERS.ANNUAL_INCOME}
        />
        <AlertError message={errors.annualIncom?.message} />
      </div>

      <div>
        <input
          {...register("taxYear", { valueAsNumber: true })}
          type="number"
          placeholder={STRINGS_DICTIONARY.PLACE_HOLDERS.TAX_YEAR}
        />
        <AlertError message={errors.taxYear?.message} />
      </div>

      <button type="submit" disabled={loading}>
        {STRINGS_DICTIONARY.BUTTONS.CALCULATE}
      </button>
    </form>
  );
}

export default TaxForm;
