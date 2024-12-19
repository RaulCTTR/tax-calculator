import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AlertMessage from "@components/AlertMessage";

const AlertError = AlertMessage.Error;

const taxFormSchema = z.object({
  annualIncom: z
    .number()
    .min(0, "Annual income must be a positive number")
    .max(99999999999999, "Annual income is too large"),
  taxYear: z
    .number()
    .min(1900, "Tax year must be after 1900")
    .max(new Date().getFullYear() + 1, "Tax year cannot be in the future"),
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
          placeholder="Annual Income"
        />
        <AlertError message={errors.annualIncom?.message} />
      </div>

      <div>
        <input
          {...register("taxYear", { valueAsNumber: true })}
          type="number"
          placeholder="Tax year"
        />
        <AlertError message={errors.taxYear?.message} />
      </div>

      <button type="submit" disabled={loading}>
        Calculate
      </button>
    </form>
  );
}

export default TaxForm;
