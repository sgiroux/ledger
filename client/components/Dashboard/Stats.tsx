import { PlaidTransaction } from "../../api-client";
import CurrencyFormat from "../CurrencyFormat";
import DateFormat from "../DateFormat";

export interface StatsProps {
  totalSpend?: number;
  largestTransaction?: PlaidTransaction,
  costliestDay?: string;
}

const Stats:React.FC<StatsProps> = ({totalSpend, largestTransaction, costliestDay}) => {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Spent</dt>
          <dd className="mt-1 text-3xl tracking-tight font-semibold text-gray-900"><CurrencyFormat currencyCode="USD" amount={totalSpend || 0} /></dd>
        </div>
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Largest Transaction</dt>
          <dd className="mt-1 text-3xl tracking-tight font-semibold text-gray-900"><CurrencyFormat currencyCode="USD" amount={largestTransaction?.amount || 0} /></dd>
        </div>
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Costliest Day</dt>
          <dd className="mt-1 text-3xl tracking-tight font-semibold text-gray-900">
            { 
              costliestDay ? ( 
                <DateFormat date={costliestDay} format="MMM Do" />
              ) : (
                "--"
              )
            
            }
            
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default Stats;


