/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { SummaryStatsDTODateRangeEnum } from '../../api-client/models/summary-stats-dto';

const dateRanges: DateRange[] = [
  { id: 1, name: 'Last 7 Days', value: SummaryStatsDTODateRangeEnum._7DAYS },
  { id: 2, name: 'Last 14 Days', value: SummaryStatsDTODateRangeEnum._14DAYS },
  { id: 3, name: 'Last 30 Days', value: SummaryStatsDTODateRangeEnum._30DAYS },
  { id: 4, name: 'Last 60 Days', value: SummaryStatsDTODateRangeEnum._60DAYS },
  { id: 5, name: 'Last 90 Days', value: SummaryStatsDTODateRangeEnum._90DAYS },
];

const getItemByDateRangeEnum = (
  dateRangeEnum: SummaryStatsDTODateRangeEnum,
) => {
  const dateRange = dateRanges.find((x) => x.value === dateRangeEnum);
  if (dateRange) {
    return dateRange;
  } else {
    return dateRanges[2];
  }
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface DateRange {
  id: number;
  name: string;
  value: SummaryStatsDTODateRangeEnum;
}

interface DateRangePickerProps {
  onChange: (value: SummaryStatsDTODateRangeEnum) => void;
  value: SummaryStatsDTODateRangeEnum;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  value,
}) => {
  const [dateRange, setDateRange] = React.useState(
    getItemByDateRangeEnum(value),
  );

  React.useEffect(() => {
    setDateRange(getItemByDateRangeEnum(value));
  }, [value]);

  return (
    <Listbox
      value={dateRange}
      by='id'
      onChange={(dateRange: DateRange) => onChange(dateRange.value)}
    >
      {({ open }) => (
        <>
          <div className='relative mt-1'>
            <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
              <span className='block truncate'>{dateRange.name}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {dateRanges.map((dateRange) => (
                  <Listbox.Option
                    key={dateRange.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={dateRange}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {dateRange.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default DateRangePicker;
