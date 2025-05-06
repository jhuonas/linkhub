'use client';

import Link from 'next/link';
import LoginForm from './LoginForm'; // ajuste o caminho conforme sua estrutura

export default function Login() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Login</h1>
          <p className='mt-2 text-gray-600'>Access your account to manage your links</p>
        </div>

        <LoginForm />

        <div className='text-center mt-4'>
          <p className='text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='font-medium text-blue-600 hover:text-blue-500'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}