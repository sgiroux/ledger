import dynamic from 'next/dynamic';
import React from 'react';
import useSWR from 'swr';
import {
  SummaryStatsDTO,
  SummaryStatsDTODateRangeEnum,
} from '../../api-client/models/summary-stats-dto';
import Loader from '../Loader';
import TransactionList from '../TransactionList';
import DateRangePicker from './DateRangePicker';
import NoData from './NoData';
import Stats from './Stats';

const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
});

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = React.useState(
    SummaryStatsDTODateRangeEnum._30DAYS,
  );
  const { data, error } = useSWR<SummaryStatsDTO>(
    `/api/stats/summary?dateRange=${dateRange}`,
  );

  const onDateRangeChange = (value: SummaryStatsDTODateRangeEnum) => {
    setDateRange(value);
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

  if (data.transactions.length === 0) {
    return <NoData />;
  }

  return (
    <>
      <div className='px-4 sm:px-6 md:px-8'>
        <div>
          <h3>Last 30 Days</h3>
          {/*<DateRangePicker onChange={onDateRangeChange} value={dateRange} />*/}
        </div>
        <Stats
          costliestDay={data.costliestDate}
          largestTransaction={data.largestTransaction}
          totalSpend={data.totalSpend}
        />
      </div>

      <div className='pt-4 h-64'>
        <Chart dailyDataPoints={data.dailyDataPoints} />
      </div>

      <div className='px-4 sm:px-6 md:px-8'>
        <TransactionList transactions={data.transactions} />
      </div>
    </>
  );
};

export default Dashboard;
