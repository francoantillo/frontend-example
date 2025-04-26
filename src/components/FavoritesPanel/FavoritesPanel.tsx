import React, { useState } from 'react';
import { Plus, Folder, Edit2, Trash2, X } from 'lucide-react';
import { FavoritesList } from '../../types';

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesPanel: React.FC<FavoritesPanelProps> = ({ isOpen, onClose }) => {
  const [lists, setLists] = useState<FavoritesList[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (!newListName.trim()) return;

    const newList: FavoritesList = {
      id: crypto.randomUUID(),
      name: newListName.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      newsIds: [],
    };

    setLists([...lists, newList]);
    setNewListName('');
    setIsCreating(false);
  };

  const handleDeleteList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 z-50">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">My Lists</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close panel"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {lists.length === 0 && !isCreating ? (
            <div className="text-center text-gray-500 mt-8">
              <Folder className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No lists created yet</p>
              <p className="text-sm mt-2">Create a list to start saving news</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lists.map(list => (
                <div
                  key={list.id}
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{list.name}</h3>
                      <p className="text-xs text-gray-500 mt-2">
                        {list.newsIds.length} {list.newsIds.length === 1 ? 'article' : 'articles'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-400 hover:text-blue-600"
                        aria-label="Edit list"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteList(list.id)}
                        className="text-gray-400 hover:text-red-600"
                        aria-label="Delete list"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isCreating && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">New list</h3>
              <input
                type="text"
                placeholder="List name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateList}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={!newListName.trim()}
                >
                  Create list
                </button>
              </div>
            </div>
          )}
        </div>

        {!isCreating && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setIsCreating(true)}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={20} className="mr-2" />
              Create new list
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPanel;