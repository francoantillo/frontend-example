import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchNews } from '../../services/api';
import { News } from '../../types';
import NewsGrid from '../../components/NewsGrid/NewsGrid';
import { ArrowLeft, Search } from 'lucide-react';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      try {
        if (query) {
          const data = await searchNews(query);
          setResults(data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error searching news:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [query]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          Volver a noticias
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resultados de búsqueda</h1>
        <div className="flex items-center text-gray-600">
          <Search size={16} className="mr-2" />
          <p>
            {loading ? 'Buscando...' : 
              results.length 
                ? `Se encontraron ${results.length} resultados para "${query}"` 
                : `No se encontraron resultados para "${query}"`
            }
          </p>
        </div>
      </div>
      
      {loading ? (
        <NewsGrid news={[]} isLoading={true} />
      ) : (
        <NewsGrid news={results} />
      )}
      
      {!loading && results.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-medium text-gray-800 mb-2">No se encontraron noticias</h2>
          <p className="text-gray-600 mb-4">
            No hemos podido encontrar noticias que coincidan con "{query}".
          </p>
          <p className="text-gray-600">
            Prueba con otros términos o explora las noticias más recientes en nuestra 
            <Link to="/" className="text-blue-600 hover:text-blue-800 ml-1">
              página de inicio
            </Link>.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;