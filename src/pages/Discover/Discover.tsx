import React, { useState, useEffect } from 'react';
import { getDiscoverContent } from '../../services/api';
import { News } from '../../types';
import NewsGrid from '../../components/NewsGrid/NewsGrid';
import FiltersPanel, { FilterOptions } from '../../components/FiltersPanel/FiltersPanel';

const Discover: React.FC = () => {
  const [content, setContent] = useState<News[]>([]);
  const [filteredContent, setFilteredContent] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getDiscoverContent();
        setContent(data);
        setFilteredContent(data);
      } catch (error) {
        console.error('Error fetching discover content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    let filtered = [...content];
    
    if (newFilters.topics && newFilters.topics.length > 0) {
      filtered = filtered.filter(item => 
        item.topics.some(topic => newFilters.topics!.includes(topic))
      );
    }
    
    setFilteredContent(filtered);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Discover</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Explore Interesting Content</h2>
        <p className="text-gray-700">
          Discover in-depth articles, analysis, and interesting stories that go beyond the daily news cycle.
        </p>
      </div>
      
      <FiltersPanel onFilterChange={handleFilterChange} />
      
      <NewsGrid news={filteredContent} isLoading={loading} />
    </div>
  );
};

export default Discover;