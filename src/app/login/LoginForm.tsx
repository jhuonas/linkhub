'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    const storage = JSON.parse(localStorage.getItem('linkhub') || '{"users":[]}');
    const user = storage.users.find((u: any) => u.email === formData.email && u.password === formData.password);

    if (!user) {
      setError('Incorrect email or password');
      return;
    }

    storage.currentUser = {
      email: user.email,
      username: user.username,
    };
    localStorage.setItem('linkhub', JSON.stringify(storage));
    router.push('/dashboard');
  };

  return (
    <>
      {error && <div className='p-3 bg-red-100 text-red-700 rounded-md text-sm'>{error}</div>}

      <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
