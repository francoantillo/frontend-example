import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { FavoritesList, News } from '../../types';

interface SaveToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: News;
  lists: FavoritesList[];
  onSave: (listIds: string[]) => void;
  onCreateList: (name: string) => void;
}

const SaveToListModal: React.FC<SaveToListModalProps> = ({
  isOpen,
  onClose,
  news,
  lists,
  onSave,
  onCreateList,
}) => {
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListName, setNewListName] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(selectedLists);
    onClose();
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList(newListName.trim());
      setNewListName('');
      setIsCreatingList(false);
    }
  };

  const toggleListSelection = (listId: string) => {
    setSelectedLists(prev =>
      prev.includes(listId)
        ? prev.filter(id => id !== listId)
        : [...prev, listId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Save article</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2">{news.aiTitle}</h3>
            <p className="text-sm text-gray-600">{news.aiSummary.substring(0, 100)}...</p>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {lists.map(list => (
              <label
                key={list.id}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedLists.includes(list.id)}
                  onChange={() => toggleListSelection(list.id)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900">{list.name}</span>
              </label>
            ))}
          </div>

          {isCreatingList ? (
            <div className="mt-4">
              <input
                type="text"
                placeholder="List name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsCreatingList(false)}
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
          ) : (
            <button
              onClick={() => setIsCreatingList(true)}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md border border-blue-600"
            >
              <Plus size={20} className="mr-2" />
              Create new list
            </button>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={selectedLists.length === 0}
          >
            Save to {selectedLists.length} {selectedLists.length === 1 ? 'list' : 'lists'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveToListModal;