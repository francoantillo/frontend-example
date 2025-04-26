import React from 'react';
import { News } from '../../types';
import NewsCard from '../NewsCard/NewsCard';

interface NewsGridProps {
  news: News[];
  isLoading?: boolean;
}

const NewsGrid: React.FC<NewsGridProps> = ({ news, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 h-[450px] animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-48 bg-gray-200 rounded mb-3"></div>
            <div className="flex gap-1 mb-3">
              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
              <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-xl">No hay noticias disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
};

export default NewsGrid;