export interface CurrencyFormatterProps {
  currencyCode: string;
  amount: number;
}

const CurrencyFormat: React.FC<CurrencyFormatterProps> = ({
  currencyCode,
  amount,
}) => {
  return (
    <span>
      ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}{' '}
    </span>
  );
};

export default CurrencyFormat;
