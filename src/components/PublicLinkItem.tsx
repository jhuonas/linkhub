import { LinkItem } from '@/types/link';

interface PublicLinkItemProps {
  link: LinkItem;
}

export default function PublicLinkItem({ link }: PublicLinkItemProps) {
  return (
    <a
      key={link.id}
      href={link.url}
      target='_blank'
      rel='noopener noreferrer'
      className='block bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-200'
    >
      <span className='text-lg font-medium text-gray-900'>{link.title}</span>
    </a>
  );
} 