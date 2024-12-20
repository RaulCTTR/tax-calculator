import "./TaxTable.style.css";

import type { TaxPerBracket } from "@hooks/useTaxCalculator";
import { STRINGS_DICTIONARY } from "@utils/strings";
import { formatMoneyWithCurrency } from "@utils/formats";

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
        <td>{formatMoneyWithCurrency(min)}</td>
        <td>{max ? formatMoneyWithCurrency(max) : "-"}</td>
        <td>{rate}</td>
        <td>{formatMoneyWithCurrency(taxAmount)}</td>
        <td>{formatMoneyWithCurrency(incomeBracket)}</td>
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
