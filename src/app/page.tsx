import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>Welcome to LinkHub</h1>
        <p className='text-xl text-gray-700 mb-8'>Your personal hub to share all your important links</p>
        <div className='space-x-4'>
          <Link
            href='/login'
            className='rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700'
          >
            Log In
          </Link>
          <Link
            href='/register'
            className='rounded-md bg-gray-200 px-6 py-3 text-base font-medium text-gray-800 hover:bg-gray-300'
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
