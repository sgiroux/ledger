import { XCircleIcon } from '@heroicons/react/24/solid';

interface AlertProps {
  message?: string;
  isVisible: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, isVisible }) => {
  return (
    <div
      hidden={!isVisible}
      className='rounded-md bg-red-50 p-4 border-2 border-red-400 mb-5'
    >
      <div className='flex'>
        <div className='flex-shrink-0'>
          <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium text-red-800'>{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default Alert;
