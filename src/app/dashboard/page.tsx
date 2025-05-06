'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LinkItem } from './LinkItem';
import { Welcome } from './Welcome';
import { LinkForm } from './LinkForm';

type LinkItem = {
  id: string;
  title: string;
  url: string;
  status: 'active' | 'inactive';
  order: number;
};

export default function Dashboard() {
  const [username, setUsername] = useState<string>('User');
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentLink, setCurrentLink] = useState<LinkItem | null>(null);
  const [formData, setFormData] = useState({ title: '', url: '' });
  const router = useRouter();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('linkhub') || '{"currentUser":null,"users":[]}');

    if (!storage.currentUser) {
      router.push('/login');
      return;
    }

    setUsername(storage.currentUser.username);

    const currentUserData = storage.users.find((u: any) => u.username === storage.currentUser.username);

    if (currentUserData && currentUserData.links.length) {
      const userLinks = [...currentUserData.links];
      userLinks.sort((a: LinkItem, b: LinkItem) => a.order - b.order);
      setLinks(userLinks);
    }
  }, []);

  useEffect(() => {
    if (links.length > 0) {
      const storage = JSON.parse(localStorage.getItem('linkhub') || '{"currentUser":null,"users":[]}');

      if (storage.currentUser) {
        const currentUserIndex = storage.users.findIndex((u: any) => u.username === storage.currentUser.username);

        if (currentUserIndex !== -1) {
          storage.users[currentUserIndex].links = links;
          localStorage.setItem('linkhub', JSON.stringify(storage));
        }
      }
    }
  }, [links]);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.url) return;

    const newLinkItem: LinkItem = {
      id: Date.now().toString(),
      title: formData.title,
      url: formData.url,
      status: 'active',
      order: links.length,
    };

    setLinks([...links, newLinkItem]);
    setFormData({ title: '', url: '' });
    setShowAddForm(false);
  };

  const handleEditLink = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentLink || !formData.title || !formData.url) return;

    setLinks(
      links.map((link) => (link.id === currentLink.id ? { ...link, title: formData.title, url: formData.url } : link))
    );

    setFormData({ title: '', url: '' });
    setCurrentLink(null);
    setShowEditForm(false);
  };

  const openEditForm = (link: LinkItem) => {
    setCurrentLink(link);
    setFormData({ title: link.title, url: link.url });
    setShowEditForm(true);
  };

  const toggleLinkStatus = (id: string) => {
    const updatedLinks = links.map((link) =>
      link.id === id
        ? { ...link, status: link.status === 'active' ? ('inactive' as const) : ('active' as const) }
        : link
    );
    setLinks(updatedLinks);
  };

  const deleteLink = (id: string) => {
    const deletedLink = links.find((link) => link.id === id);
    if (!deletedLink) return;

    const updatedLinks = links
      .filter((link) => link.id !== id)
      .map((link) => {
        if (link.order > deletedLink.order) {
          return { ...link, order: link.order - 1 };
        }
        return link;
      });

    setLinks(updatedLinks);
  };

  const [draggedItem, setDraggedItem] = useState<LinkItem | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, link: LinkItem) => {
    setDraggedItem(link);
    e.dataTransfer.setData('text/plain', link.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOverIndex(index);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (!draggedItem) return;

    const dragIndex = links.findIndex((link) => link.id === draggedItem.id);

    if (dragIndex === dropIndex) return;

    const reorderedLinks = Array.from(links);
    const [removed] = reorderedLinks.splice(dragIndex, 1);
    reorderedLinks.splice(dropIndex, 0, removed);

    const updatedLinks = reorderedLinks.map((link, index) => ({
      ...link,
      order: index,
    }));

    setLinks(updatedLinks);
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  const handleShowNewFormData = () => {
    setShowAddForm(true);
    setShowEditForm(false);
    setFormData({ title: '', url: '' });
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-4xl'>
        <header className='mb-8 flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-gray-900'>My LinkHub</h1>

          <Link
            href='/login'
            className='rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700'
            onClick={() => {
              const storage = JSON.parse(localStorage.getItem('linkhub') || '{}');
              delete storage.currentUser;
              localStorage.setItem('linkhub', JSON.stringify(storage));
            }}
          >
            Logout
          </Link>
        </header>

        <Welcome username={username} showNewFormData={handleShowNewFormData} />

        {showAddForm && (
          <LinkForm
            mode='add'
            formData={formData}
            onFormDataChange={setFormData}
            onSubmit={handleAddLink}
            onClose={() => setShowAddForm(false)}
          />
        )}

        {showEditForm && currentLink && (
          <LinkForm
            mode='edit'
            formData={formData}
            onFormDataChange={setFormData}
            onSubmit={handleEditLink}
            onClose={() => setShowEditForm(false)}
          />
        )}

        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h3 className='text-lg font-medium mb-4'>My Links</h3>

          {links.length === 0 ? (
            <p className='text-gray-500 text-center py-6'>You don't have any links yet.</p>
          ) : (
            <div className='space-y-4'>
              {links.map((link, index) => (
                <LinkItem
                  key={link.id}
                  link={link}
                  index={index}
                  draggedItem={draggedItem}
                  draggedOverIndex={draggedOverIndex}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  onEdit={openEditForm}
                  onToggleStatus={toggleLinkStatus}
                  onDelete={deleteLink}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
