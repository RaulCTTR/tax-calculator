import "./TaxDetails.style.css";

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
    <section className="tax-details">
      <div className="tax-details--wrap">
        <div className="tax-details--result">
          <h2>Total Tax</h2>
          <p className="tax-details--amount">${totalTax}</p>
        </div>

        <div className="tax-details--result">
          <h2>Effective rate</h2>
          <p className="tax-details--amount">{effectiveRate}%</p>
        </div>
      </div>

      <div className="tax-details--result">
        <TaxTable taxes={taxes} />
      </div>
    </section>
  );
}

export default TaxDetails;
