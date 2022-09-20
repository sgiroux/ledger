import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { DailyDataPointsDTO } from '../../api-client/models/daily-data-points-dto';

export interface ChartProps {
  dailyDataPoints: DailyDataPointsDTO[];
}

const Chart: React.FC<ChartProps> = ({ dailyDataPoints }) => {
  return (
    <ResponsiveContainer width='100%' height={200}>
      <AreaChart
        data={dailyDataPoints}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#002E55' stopOpacity={0.8} />
            <stop offset='90%' stopColor='#f3f4f6' stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <Area
          type='natural'
          dataKey='value'
          stroke='#111827'
          fill='url(#colorUv)' /*fill="#002E55"*/
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
