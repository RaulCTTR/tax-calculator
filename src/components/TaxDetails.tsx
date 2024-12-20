import "./TaxDetails.style.css";

import TaxTable from "@components/TaxTable";
import type { TaxPerBracket } from "@hooks/useTaxCalculator";
import Loading from "@components/Loading";

import { STRINGS_DICTIONARY } from "@utils/strings";
import { formatMoney } from "@utils/formats";

interface TaxDetailsProps {
  totalTax?: number;
  effectiveRate?: number;
  taxes: TaxPerBracket[];
  loading?: boolean;
}

function TaxDetails({
  totalTax,
  effectiveRate,
  taxes,
  loading,
}: TaxDetailsProps): JSX.Element {
  if (loading) {
    return <Loading />;
  }

  if (!totalTax && !effectiveRate && taxes.length === 0) {
    return (
      <h3 className="tax-details--label">
        {STRINGS_DICTIONARY.TEXTS.CALCULATE_TAXES}
      </h3>
    );
  }

  return (
    <section className="tax-details">
      <div className="tax-details--wrap">
        <div className="tax-details--result">
          <h2>{STRINGS_DICTIONARY.LABELS.TOTAL_TAX}</h2>
          <p className="tax-details--amount">
            ${formatMoney(totalTax as number)}
          </p>
        </div>

        <div className="tax-details--result">
          <h2>{STRINGS_DICTIONARY.LABELS.EFFECTIVE_RATE}</h2>
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
