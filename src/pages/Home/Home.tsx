import React, { useState, useEffect } from 'react';
import { getNews } from '../../services/api';
import { News } from '../../types';
import NewsGrid from '../../components/NewsGrid/NewsGrid';
import FiltersPanel, { FilterOptions } from '../../components/FiltersPanel/FiltersPanel';

const Home: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
        setFilteredNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    let filtered = [...news];
    
    // Filter by region
    if (newFilters.region) {
      filtered = filtered.filter(item => item.region === newFilters.region);
    }
    
    // Filter by date
    if (newFilters.date) {
      const now = new Date();
      let dateLimit: Date;
      
      switch (newFilters.date) {
        case 'day':
          dateLimit = new Date(now.setDate(now.getDate() - 1));
          break;
        case 'week':
          dateLimit = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          dateLimit = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'custom':
          if (newFilters.dateRange?.start && newFilters.dateRange?.end) {
            filtered = filtered.filter(item => {
              const pubDate = new Date(item.publishedAt);
              const startDate = new Date(newFilters.dateRange!.start);
              const endDate = new Date(newFilters.dateRange!.end);
              return pubDate >= startDate && pubDate <= endDate;
            });
          }
          break;
        default:
          break;
      }
      
      if (newFilters.date !== 'custom') {
        filtered = filtered.filter(item => new Date(item.publishedAt) >= dateLimit);
      }
    }
    
    // Filter by topics
    if (newFilters.topics && newFilters.topics.length > 0) {
      filtered = filtered.filter(item => 
        item.topics.some(topic => newFilters.topics!.includes(topic))
      );
    }
    
    setFilteredNews(filtered);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Últimas Noticias</h1>
      
      <FiltersPanel onFilterChange={handleFilterChange} />
      
      <NewsGrid news={filteredNews} isLoading={loading} />
    </div>
  );
};

export default Home;