import Moment from 'moment';

export interface DateFormatProps {
  date: string | Date;
  format: 'MMM Do' | 'MMM';
}

const DateFormat:React.FC<DateFormatProps> = ({date, format}) => {
  return (
    <>{Moment(date).format(format)}</>
  )

}

export default DateFormat;