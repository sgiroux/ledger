import { WalletIcon, XCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Alert from '../components/Alert';
import {
  getSystemStatusSSR,
  getUserSSR,
} from '../utils/server-side-render-utils';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const SetupPage = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingError, setProcessingError] = useState<string>();

  const submitForm = async () => {
    setIsProcessing(true);

    try {
      const response = await axios.post('/api/system/initialize', {
        email: email,
        password: password,
      });

      router.push('/');
    } catch (err: any) {
      setProcessingError(err.response.data.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const validate = () => {
    let hasError = false;

    setProcessingError(undefined);
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else {
      setEmailError(undefined);
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError(undefined);
    }
    return hasError;
  };

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    // Save it
    if (!validate()) {
      submitForm();
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Alert message={processingError} isVisible={Boolean(processingError)} />

        <WalletIcon className='h-20 w-20 text-indigo-600 mx-auto' />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Setup
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          <span className='font-medium '>create the initial user account</span>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' action='#' method='POST'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classNames(
                    emailError
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
                    'block w-full shadow-sm sm:text-sm rounded-md',
                  )}
                />
                <p className='mt-2 text-sm text-red-600' id='name-error'>
                  {emailError}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classNames(
                    passwordError
                      ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
                    'block w-full shadow-sm sm:text-sm rounded-md',
                  )}
                />
                <p className='mt-2 text-sm text-red-600' id='name-error'>
                  {passwordError}
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={(event) => handleSubmit(event)}
                type='submit'
                className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                <div hidden={!isProcessing}>
                  <svg
                    role='status'
                    className='inline mr-3 w-4 h-4 text-white animate-spin'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='#E5E7EB'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const systemStatus = await getSystemStatusSSR(context.req.cookies);

    if (systemStatus.isInitialized) {
      // redirect to dashboard
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  } catch (err: any) {
    throw new Error(err);
  }

  return {
    props: {},
  };
};

export default SetupPage;
