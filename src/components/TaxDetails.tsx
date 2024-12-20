import TaxTable from "@components/TaxTable";
import type { TaxPerBracket } from "@hooks/useTaxCalculator";

interface TaxDetailsProps {
  totalTax?: number;
  effectiveRate?: number;
  taxes: TaxPerBracket[];
}

function TaxDetails({
  totalTax,
  effectiveRate,
  taxes,
}: TaxDetailsProps): JSX.Element {
  return (
    <section>
      <div>
        <div>
          <span>Total Tax</span>
          <p>{totalTax}</p>
        </div>

        <div>
          <span>Effective rate</span>
          <p>{effectiveRate}</p>
        </div>
      </div>

      <TaxTable taxes={taxes} />
    </section>
  );
}

export default TaxDetails;
