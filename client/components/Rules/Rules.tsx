import { Switch } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { Rule } from '../../api-client/models/rule';
import Alert from '../Alert';
import Loader from '../Loader';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Rules: React.FC = () => {
  const { data, error, mutate } = useSWR<Rule[]>('/api/rules');
  const router = useRouter();
  const [rules, setRules] = React.useState<Rule[]>([]);

  React.useEffect(() => {
    if (data) {
      setRules(data);
    }
  }, [data]);

  const editRule = (rule: Rule) => {
    router.push(`/rules/${rule.id}`);
  };

  const createRule = () => {
    router.push('/rules/create');
  };

  const toggleRuleIsEnabled = (index: number) => {
    const rule = rules[index];
    rule.isEnabled = !rule.isEnabled;

    setRules([...rules]);

    //make the call
    axios.patch(`/api/rules/${rule.id}`, rule);
  };

  if (error) {
    return (
      <div className='px-4 sm:px-6 md:px-8'>
        <Alert message='Something went went' isVisible={true} />
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
            <h1 className='text-xl font-semibold text-gray-900'>Rules</h1>
            <p className='mt-2 text-sm text-gray-700'>
              This is a list of transaction exclusion rules. Typically one would
              like to exclude income, credit card payments, etc. as that can
              skew the ledger results.
            </p>
          </div>
          <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
            <button
              type='button'
              onClick={createRule}
              className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
            >
              Add Rule
            </button>
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
                  Field
                </th>
                <th
                  scope='col'
                  className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell'
                >
                  Operation
                </th>
                <th
                  scope='col'
                  className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                >
                  Criteria
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Enabled
                </th>
                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {rules.map((rule, index) => (
                <tr key={rule.id}>
                  <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6'>
                    {rule.name}
                    <dl className='font-normal lg:hidden'>
                      <dt className='sr-only'>{rule.name}</dt>
                      <dd className='mt-1 truncate text-gray-700'>
                        {rule.field}
                      </dd>
                      <dd className='mt-1 truncate text-gray-700'>
                        {rule.operation}
                      </dd>
                      <dd className='mt-1 truncate text-gray-500 sm:hidden'>
                        <div className='truncate'>{rule.criteria}</div>
                      </dd>
                    </dl>
                  </td>
                  <td className='hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'>
                    {rule.field}
                  </td>
                  <td className='hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'>
                    {rule.operation}
                  </td>
                  <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                    <div className='max-w-[75px] truncate'>{rule.criteria}</div>
                  </td>
                  <td className='px-3 py-4 text-sm text-gray-500'>
                    <Switch
                      checked={rule.isEnabled}
                      onChange={() => toggleRuleIsEnabled(index)}
                      className={classNames(
                        rule.isEnabled ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                      )}
                    >
                      <span className='sr-only'>Use setting</span>
                      <span
                        aria-hidden='true'
                        className={classNames(
                          rule.isEnabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                        )}
                      />
                    </Switch>
                  </td>
                  <td className='py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                    <button
                      onClick={() => editRule(rule)}
                      className='text-indigo-600 hover:text-indigo-900'
                    >
                      Edit<span className='sr-only'>, {rule.name}</span>
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

export default Rules;
