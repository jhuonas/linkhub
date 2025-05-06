interface LinkFormProps {
  mode: 'add' | 'edit';
  formData: { title: string; url: string };
  onFormDataChange: (data: { title: string; url: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function LinkForm({ mode, formData, onFormDataChange, onSubmit, onClose }: LinkFormProps) {
  return (
    <div className='rounded-lg bg-white p-6 shadow-md mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-medium'>{mode === 'add' ? 'Add new link' : 'Edit link'}</h3>
        <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='18' y1='6' x2='6' y2='18'></line>
            <line x1='6' y1='6' x2='18' y2='18'></line>
          </svg>
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <label htmlFor={`${mode}-title`} className='block text-sm font-medium text-gray-700 mb-1'>
            Title
          </label>
          <input
            type='text'
            id={`${mode}-title`}
            value={formData.title}
            onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Ex: My GitHub'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor={`${mode}-url`} className='block text-sm font-medium text-gray-700 mb-1'>
            URL
          </label>
          <input
            type='url'
            id={`${mode}-url`}
            value={formData.url}
            onChange={(e) => onFormDataChange({ ...formData, url: e.target.value })}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='https://example.com'
            required
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='button'
            onClick={onClose}
            className='mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
          >
            {mode === 'add' ? 'Add' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
