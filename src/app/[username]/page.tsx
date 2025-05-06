'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { LinkItem } from '@/types/link';
import PublicLinkItem from '@/components/PublicLinkItem';

export default function UserProfile() {
  const params = useParams();
  const username = params.username as string;
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('linkhub') || '{"users":[]}');

    const userData = storage.users.find((u: any) => u.username === username);

    if (userData) {
      setUserExists(true);

      const activeLinks = userData.links
        .filter((link: LinkItem) => link.status === 'active')
        .sort((a: LinkItem, b: LinkItem) => a.order - b.order);

      setLinks(activeLinks);
    }

    setLoading(false);
  }, [username]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (!userExists) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-4'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>User Not Found</h1>
        <p className='text-xl text-gray-700 mb-8'>
          The user "{username}" doesn't exist or hasn't created a profile yet.
        </p>
        <Link href='/' className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6'>
      <div className='max-w-md mx-auto pt-10 pb-16'>
        <div className='text-center mb-10'>
          <div className='w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4'>
            {username.charAt(0).toUpperCase()}
          </div>
          <h1 className='text-3xl font-bold text-gray-900'>@{username}</h1>
        </div>

        <div className='space-y-4'>
          {links.length === 0 ? (
            <div className='bg-white rounded-lg p-6 text-center shadow-md'>
              <p className='text-gray-500'>This user hasn't added any links yet.</p>
            </div>
          ) : (
            links.map((link) => (
              <PublicLinkItem key={link.id} link={link} />
            ))
          )}
        </div>

        <div className='mt-12 text-center'>
          <p className='text-sm text-gray-600'>
            Powered by{' '}
            <Link href='/' className='text-blue-600 hover:underline'>
              LinkHub
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
