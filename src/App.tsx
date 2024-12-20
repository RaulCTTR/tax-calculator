import "./App.css";
import TaxForm from "@components/TaxForm";
import TaxDetails from "@components/TaxDetails";
import AlertMessage from "@components/AlertMessage";

import { ERRORS_DICTIONARY } from "@utils/strings";

const ErrorMessage = AlertMessage.Error;

import { useTaxCalculator } from "@hooks/useTaxCalculator";

function App() {
  const {
    totalTax,
    taxPerBracket,
    effectiveRate,
    calculateTax,
    loading,
    error,
  } = useTaxCalculator();

  return (
    <div className="tax-app">
      <section className="tax-section">
        <TaxForm onSubmit={calculateTax} loading={loading} />
        <TaxDetails
          loading={loading}
          taxes={taxPerBracket || []}
          totalTax={totalTax}
          effectiveRate={effectiveRate}
        />

        <ErrorMessage message={ERRORS_DICTIONARY[error?.message]} />
      </section>
    </div>
  );
}

export default App;
