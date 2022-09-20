import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Account } from '../../api-client';
import Loader from '../Loader';

const Accounts: React.FC = () => {
  const { data, error } = useSWR<Account[]>('/api/accounts');
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    if (data) {
      setAccounts(data);
    }
  }, [data]);

  const deleteAccount = async (account: Account) => {
    //Remove the account
    const filteredAccount = accounts.filter((x) => x.id !== account.id);
    setAccounts(filteredAccount);
    axios.delete(`/api/accounts/${account.id}`);
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
    <>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-xl font-semibold text-gray-900'>Accounts</h1>
            <p className='mt-2 text-sm text-gray-700'>
              This is a list of all connected accounts where you can manage
              them.
            </p>
          </div>
          <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
            <Link href='/link/start'>
              <a className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'>
                Add Account
              </a>
            </Link>
          </div>
        </div>
        <div className='-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-300'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                >
                  Name
                </th>
                <th
                  scope='col'
                  className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell'
                >
                  Official Name
                </th>
                <th
                  scope='col'
                  className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                >
                  Type
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Sub Type
                </th>
                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                  <span className='sr-only'>Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {accounts.map((account, index) => (
                <tr key={account.id}>
                  <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6'>
                    {account.name}
                    <dl className='font-normal lg:hidden'>
                      <dt className='sr-only'>{account.name}</dt>
                      <dd className='mt-1 truncate text-gray-700'>
                        {account.officialName}
                      </dd>
                      <dt className='sr-only sm:hidden'>
                        {account.officialName}
                      </dt>
                      <dd className='mt-1 truncate text-gray-500 sm:hidden'>
                        {account.type}
                      </dd>
                    </dl>
                  </td>
                  <td className='hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'>
                    {account.officialName}
                  </td>
                  <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                    {account.type}
                  </td>
                  <td className='px-3 py-4 text-sm text-gray-500'>
                    {account.subtype}
                  </td>
                  <td className='py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                    <button
                      onClick={() => deleteAccount(account)}
                      className='text-indigo-600 hover:text-indigo-900'
                    >
                      Delete<span className='sr-only'>, {account.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Accounts;
