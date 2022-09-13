

import { CalendarIcon, ShoppingBagIcon, ChevronRightIcon, BuildingOfficeIcon  } from '@heroicons/react/24/solid'
import Link from 'next/link';
import { Transaction } from '../api-client';
import CurrencyFormat from './CurrencyFormat';
import DateFormat from './DateFormat';

export interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({transactions}) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Link href={`/transactions/${transaction.id}`}>
              <a className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="flex text-sm">
                        <p className="truncate font-medium text-indigo-600">{transaction.name}</p>
                        <p className="ml-1 mt-0.5 flex-shrink-0 text-xs text-gray-400"><CurrencyFormat amount={transaction.amount} currencyCode={transaction.isoCurrencyCode || 'USD'} /></p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <p>
                            <DateFormat date={transaction.date} format="MMM Do" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div className="flex space-x-0 overflow-hidden">
                        
                        {/* This should be categories. Would be neat to see 
                        <ShoppingBagIcon className="text-indigo-600 inline-block h-6 w-6 rounded-full ring-2 ring-white"/>
                        <BuildingOfficeIcon className="text-indigo-600 inline-block h-6 w-6 rounded-full ring-2 ring-white"/>
                        */}
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList;
