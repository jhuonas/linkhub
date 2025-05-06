export type LinkItemType = {
  id: string;
  title: string;
  url: string;
  status: 'active' | 'inactive';
  order: number;
};

interface LinkItemProps {
  link: LinkItemType;
  index: number;
  draggedItem: LinkItemType | null;
  draggedOverIndex: number | null;
  onDragStart: (e: React.DragEvent, link: LinkItemType) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onEdit: (link: LinkItemType) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function LinkItem({
  link,
  index,
  draggedItem,
  draggedOverIndex,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onEdit,
  onToggleStatus,
  onDelete,
}: LinkItemProps) {
  return (
    <div
      key={link.id}
      draggable
      onDragStart={(e) => onDragStart(e, link)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      className={`border border-gray-200 rounded-lg p-4 flex items-center justify-between ${
        draggedItem?.id === link.id ? 'opacity-50' : ''
      } ${draggedOverIndex === index ? 'border-blue-500 border-2' : ''}`}
    >
      <div className='flex items-center flex-1'>
        <div className='mr-3 cursor-grab'>
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
            <line x1='8' y1='6' x2='21' y2='6'></line>
            <line x1='8' y1='12' x2='21' y2='12'></line>
            <line x1='8' y1='18' x2='21' y2='18'></line>
            <line x1='3' y1='6' x2='3.01' y2='6'></line>
            <line x1='3' y1='12' x2='3.01' y2='12'></line>
            <line x1='3' y1='18' x2='3.01' y2='18'></line>
          </svg>
        </div>
        <div
          className={`w-3 h-3 rounded-full mr-3 ${
            link.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
          }`}
        ></div>
        <div>
          <h4 className='font-medium'>{link.title}</h4>
          <a
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm text-blue-600 hover:underline'
          >
            {link.url}
          </a>
        </div>
      </div>

      <div className='flex space-x-2'>
        <button
          onClick={() => onEdit(link)}
          className='p-2 text-blue-600 rounded-md hover:bg-blue-50'
          title='Edit'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
            <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
          </svg>
        </button>

        <button
          onClick={() => onToggleStatus(link.id)}
          className={`p-2 rounded-md ${
            link.status === 'active'
              ? 'text-yellow-600 hover:bg-yellow-50'
              : 'text-green-600 hover:bg-green-50'
          }`}
          title={link.status === 'active' ? 'Deactivate' : 'Activate'}
        >
          {link.status === 'active' ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M18.36 6.64a9 9 0 1 1-12.73 0'></path>
              <line x1='12' y1='2' x2='12' y2='12'></line>
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M5 12h14'></path>
              <path d='M12 5v14'></path>
            </svg>
          )}
        </button>

        <button
          onClick={() => onDelete(link.id)}
          className='p-2 text-red-600 rounded-md hover:bg-red-50'
          title='Delete'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M3 6h18'></path>
            <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
            <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
          </svg>
        </button>
      </div>
    </div>
  );
} 