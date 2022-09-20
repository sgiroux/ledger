import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  CreateRuleDTO,
  CreateRuleDTOFieldEnum,
  CreateRuleDTOOperationEnum,
  Transaction,
} from '../../api-client';
import CurrencyFormat from '../CurrencyFormat';
import DateFormat from '../DateFormat';
import Loader from '../Loader';

interface TransactionDetailProps {
  id: string;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ id }) => {
  const router = useRouter();
  const { data, error } = useSWR<Transaction>(`/api/transactions/${id}`);

  const addAsExclusionRule = async () => {
    const createRuleDTO: CreateRuleDTO = {
      name: `Transaction: ${data!.id}`,
      criteria: data!.transactionId,
      isEnabled: true,
      field: CreateRuleDTOFieldEnum.TransactionId,
      operation: CreateRuleDTOOperationEnum.Equals,
    };
    await axios.post<CreateRuleDTO>('/api/rules', createRuleDTO);
    router.push('/transactions');
  };

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
    <div className='px-4 sm:px-6 md:px-8'>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Transaction - {data.id}
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            {data.transactionId}
          </p>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Name</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {data.name}
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Amount</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                <CurrencyFormat
                  amount={data.amount}
                  currencyCode={data.isoCurrencyCode || 'USD'}
                />
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Date</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                <DateFormat date={data.date} format={'MMM'} />
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Payment Channel
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {data.paymentChannel}
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Category</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {data.category &&
                  data.category.reduce((prev: string, next: string) => {
                    return prev + ' > ' + next;
                  })}
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Pending</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {data.pending.toString()}
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'></dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 content-end text-right'>
                <button
                  type='button'
                  onClick={addAsExclusionRule}
                  className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                >
                  Add As Exclusion Rule
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
