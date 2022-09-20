import useSWR from 'swr';
import { Transaction } from '../../api-client';
import Loader from '../Loader';
import TransactionList from '../TransactionList';

const Transactions = () => {
  const { data, error } = useSWR<Transaction[]>('/api/transactions');
  //const error = false;
  //const data = true

  if (error) {
    return (
      <div className='px-4 sm:px-6 md:px-8'>
        <div
          className='bg-gray-700 border-l-4 border-gray-800 text-gray-300 p-4'
          role='alert'
        >
          <p className='font-bold'>Error</p>
          <p>Something went wrong.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-8'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>Transactions</h1>
          <p className='mt-2 text-sm text-gray-700'>
            TODO: Add description for this page and what transactions are.
          </p>
        </div>
      </div>
      <TransactionList transactions={data} />
    </div>
  );
};

export default Transactions;
