

import { CheckIcon, ExclamationIcon, ThumbUpIcon, UserIcon, ShoppingBagIcon, OfficeBuildingIcon,  } from '@heroicons/react/solid'
import { PlaidTransaction } from '../../../api-client'
import DateFormat from '../../DateFormat';
import CurrencyFormat from '../../CurrencyFormat';
import QuickFilterMenu from './QuickFilterMenu';

export interface TransactionListProps {
  transactions: PlaidTransaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({transactions}) => {

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8 mt-10">
        {transactions.map((transaction, transactionIdx) => (
          <li key={transaction.id}>
            <div className="relative pb-8">
              {transactionIdx !== transactions.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className='bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'>
                    {transaction.paymentChannel === 'in store' ? (
                      <OfficeBuildingIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    ): (
                      <ShoppingBagIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    )}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {transaction.name}{' - '}
                      <span className="font-medium text-gray-900">
                        <CurrencyFormat amount={transaction.amount} currencyCode={transaction.isoCurrencyCode || 'USD'} />
                      </span>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <DateFormat date={transaction.date} format="MMM Do" />
                    <div className="inline-block">
                      <QuickFilterMenu />
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList;
