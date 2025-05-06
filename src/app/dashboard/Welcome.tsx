import Link from "next/link";

export function Welcome({username, showNewFormData}: { username: string, showNewFormData: () => void }) {
  return (
    <div className='rounded-lg bg-white p-6 shadow-md mb-6'>
      <h2 className='mb-4 text-xl font-semibold text-gray-800'>Welcome to your Dashboard, {username}!</h2>
      <p className='text-gray-600 mb-6'>Here you can manage your links and customize your public profile.</p>

      <div className='flex flex-wrap gap-4 mb-6'>
        <Link
          href={`/${username}`}
          target='_blank'
          className='flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors'
        >
          <span>View public profile</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
            <polyline points='15 3 21 3 21 9'></polyline>
            <line x1='10' y1='14' x2='21' y2='3'></line>
          </svg>
        </Link>
      </div>

      <button
        onClick={() => {
          showNewFormData()
        }}
        className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors'
      >
        <span>Add new link</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='12' y1='5' x2='12' y2='19'></line>
          <line x1='5' y1='12' x2='19' y2='12'></line>
        </svg>
      </button>
    </div>
  );
}
