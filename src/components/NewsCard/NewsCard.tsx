import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { News, FavoritesList } from '../../types';
import BiasCoverageBar from '../BiasCoverageBar/BiasCoverageBar';
import SaveToListModal from '../SaveToListModal/SaveToListModal';
import { Bookmark } from 'lucide-react';

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lists, setLists] = useState<FavoritesList[]>([]);

  const formattedDate = new Date(news.publishedAt).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleSaveToLists = (listIds: string[]) => {
    // In a real app, this would save to the backend
    console.log('Saving to lists:', listIds);
    setIsSaved(true);
  };

  const handleCreateList = (name: string, description?: string) => {
    const newList: FavoritesList = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      newsIds: [],
    };
    setLists([...lists, newList]);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to detail page
    setIsModalOpen(true);
  };

  return (
    <>
      <Link 
        to={`/news/${news.id}`} 
        className="block h-full transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 flex-grow pr-2">
                {news.aiTitle}
              </h3>
              <button
                onClick={handleSaveClick}
                className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                  isSaved 
                    ? 'text-blue-600 hover:bg-blue-50' 
                    : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
                aria-label={isSaved ? "Guardado en listas" : "Guardar en listas"}
              >
                <Bookmark size={20} className={isSaved ? "fill-current" : ""} />
              </button>
            </div>
            <div className="mb-3 h-48 overflow-hidden rounded-lg">
              <img 
                src={news.image} 
                alt={news.aiTitle} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {news.topics.map((topic) => (
                <span 
                  key={topic} 
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {topic}
                </span>
              ))}
              {news.people.map((person) => (
                <span 
                  key={person} 
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                >
                  {person}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
              {news.aiSummary}
            </p>
            <div className="mt-auto">
              <BiasCoverageBar sources={news.sources} />
              <p className="text-gray-500 text-xs mt-3">{formattedDate}</p>
            </div>
          </div>
        </div>
      </Link>

      <SaveToListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        news={news}
        lists={lists}
        onSave={handleSaveToLists}
        onCreateList={handleCreateList}
      />
    </>
  );
};

export default NewsCard;