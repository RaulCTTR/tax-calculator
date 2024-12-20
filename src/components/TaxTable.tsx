import "./TaxTable.style.css";

import type { TaxPerBracket } from "@hooks/useTaxCalculator";
import { STRINGS_DICTIONARY } from "@utils/strings";

interface TaxTableProps {
  taxes: TaxPerBracket[];
}

const {
  LABELS: { MIN, MAX, RATE, TAX_AMOUNT, INCOME },
} = STRINGS_DICTIONARY;

function TaxTableRows({
  taxesRaw,
}: {
  taxesRaw: TaxPerBracket[];
}): JSX.Element[] {
  return taxesRaw.map(
    ({ bracket: { min, max, rate }, taxAmount, incomeBracket }, index) => (
      <tr key={`TTR_${index}`}>
        <td>{min}</td>
        <td>{max}</td>
        <td>{rate}</td>
        <td>{taxAmount}</td>
        <td>{incomeBracket}</td>
      </tr>
    )
  );
}

function TaxTable({ taxes }: TaxTableProps): JSX.Element {
  return (
    <table className="tax-table">
      <thead>
        <tr>
          <th>{MIN}</th>
          <th>{MAX}</th>
          <th>{RATE}</th>
          <th>{TAX_AMOUNT}</th>
          <th>{INCOME}</th>
        </tr>
      </thead>
      <tbody>
        <TaxTableRows taxesRaw={taxes} />
      </tbody>
    </table>
  );
}

export default TaxTable;
