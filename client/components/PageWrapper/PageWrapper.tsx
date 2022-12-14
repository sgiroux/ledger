import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  HomeIcon,
  FolderIcon,
  ClipboardDocumentCheckIcon,
  WalletIcon,
  XMarkIcon,
  Bars3Icon,
  BanknotesIcon,
  CogIcon,
} from '@heroicons/react/24/solid';
import { BellIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import SupportBadge from './SupportBadge';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Accounts', href: '/accounts', icon: FolderIcon },
  { name: 'Rules', href: '/rules', icon: ClipboardDocumentCheckIcon },
  { name: 'Transactions', href: '/transactions', icon: BanknotesIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
  /* { name: 'Reports', href: '/link/sync', icon: ChartBarIcon, current: false },*/
];
const userNavigation = [
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export interface PageWrapperProps {
  children: React.ReactNode;
  page: 'Dashboard' | 'Rules' | 'Accounts' | 'Transactions' | 'Settings';
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, page }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const logOut = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/login');
    } catch (err) {
      router.push('/login');
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-40 md:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 flex z-40'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-0 bg-gray-800'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex-shrink-0 flex items-center px-4'>
                    <WalletIcon className='h-8 w-8 text-indigo-600' />
                    <div className='inline-block ml-3 font-bold text-xlg text-white'>
                      LEDGER
                    </div>
                  </div>
                  <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                    <nav className='px-2 space-y-1'>
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.name === page
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.name === page
                                  ? 'text-gray-300'
                                  : 'text-gray-400 group-hover:text-gray-300',
                                'mr-3 flex-shrink-0 h-6 w-6',
                              )}
                              aria-hidden='true'
                            />
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className='hidden'>
                    <SupportBadge />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='flex-shrink-0 w-14' aria-hidden='true'>
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex-1 flex flex-col min-h-0 bg-gray-800'>
            <div className='flex items-center h-16 flex-shrink-0 px-4 bg-gray-900'>
              <WalletIcon className='h-8 w-8 text-indigo-600' />
              <div className='inline-block ml-3 font-normal text-xlg text-white'>
                LEDGER
              </div>
            </div>
            <div className='flex-1 flex flex-col overflow-y-auto'>
              <nav className='flex-1 px-2 py-4 space-y-1'>
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.name === page
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.name === page
                            ? 'text-gray-300'
                            : 'text-gray-400 group-hover:text-gray-300',
                          'mr-3 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            <div className='hidden'>
              <SupportBadge />
            </div>
          </div>
        </div>
        <div className='md:pl-64 flex flex-col'>
          <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow'>
            <button
              type='button'
              className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex-1 px-4 flex justify-between'>
              <div className='flex-1 flex'>
                {/*
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
                */}
              </div>
              <div className='ml-4 flex items-center md:ml-6'>
                <button
                  type='button'
                  className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      <span className='sr-only'>Open user menu</span>
                      <span className='inline-block h-6 w-6 overflow-hidden rounded-full bg-gray-100'>
                        <svg
                          className='h-full w-full text-gray-300'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                        </svg>
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          <Link href={item.href}>
                            <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                              {item.name}
                            </a>
                          </Link>
                        </Menu.Item>
                      ))}
                      <Menu.Item>
                        <button
                          onClick={logOut}
                          className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left'
                        >
                          Log out
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className='flex-1'>
            <div className='py-6'>
              <div className='max-w-7xl mx-auto px-0 sm:px-0 md:px-0'>
                <div className='py-4'>{children}</div>
              </div>

              {/*
              
            
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
              </div>
              */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PageWrapper;
