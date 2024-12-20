import "./App.css";
import TaxForm from "@components/TaxForm";
import TaxDetails from "@components/TaxDetails";

import { useTaxCalculator } from "@hooks/useTaxCalculator";

function App() {
  const { totalTax, taxPerBracket, effectiveRate, calculateTax } =
    useTaxCalculator();

  return (
    <>
      <TaxForm onSubmit={calculateTax} loading={false} />
      <TaxDetails
        taxes={taxPerBracket || []}
        totalTax={totalTax}
        effectiveRate={effectiveRate}
      />
    </>
  );
}

export default App;
