import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsById } from '../../services/api';
import { News, Source, FavoritesList } from '../../types';
import BiasCoverageBar from '../../components/BiasCoverageBar/BiasCoverageBar';
import SaveToListModal from '../../components/SaveToListModal/SaveToListModal';
import { ArrowLeft, Clock, MapPin, Bookmark } from 'lucide-react';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lists, setLists] = useState<FavoritesList[]>([]);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (id) {
          const data = await getNewsById(id);
          setNews(data || null);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
    // Reset scroll position when navigating to a news detail
    window.scrollTo(0, 0);
  }, [id]);
  
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
  
  const getBiasClass = (bias: string): string => {
    switch(bias) {
      case 'left': return 'bg-red-100 text-red-800';
      case 'center-left': return 'bg-red-50 text-red-600';
      case 'center': return 'bg-gray-100 text-gray-800';
      case 'center-right': return 'bg-blue-50 text-blue-600';
      case 'right': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-xl text-center text-gray-600">Noticia no encontrada</p>
        <div className="flex justify-center mt-4">
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }
  
  const formattedDate = new Date(news.publishedAt).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Volver a noticias
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{news.aiTitle}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
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
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={16} className="mr-1" />
              {formattedDate}
              {news.region && (
                <span className="ml-4 flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {news.region}
                  {news.commune && `, ${news.commune}`}
                </span>
              )}
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center ${isSaved ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600 transition-colors`}
              aria-label={isSaved ? "Guardado en listas" : "Guardar en listas"}
            >
              <Bookmark size={20} className={isSaved ? "fill-current" : ""} />
              <span className="ml-1 text-sm">{isSaved ? 'Guardado' : 'Guardar'}</span>
            </button>
          </div>
          
          {/* Image Collage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
              <img 
                src={news.image} 
                alt={news.aiTitle} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Related image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2774546/pexels-photo-2774546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Related image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* AI Summary */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Resumen objetivo</h2>
            <p className="text-gray-700 leading-relaxed">{news.aiSummary}</p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Este análisis se genera a partir de la cobertura de múltiples fuentes para ofrecer una perspectiva equilibrada y objetiva de la noticia.
            </p>
          </div>
          
          {/* Sources and Coverage */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Cobertura política</h3>
            <div className="mb-2">
              <BiasCoverageBar sources={news.sources} />
            </div>
          </div>
          
          {/* Individual Sources */}
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Cobertura por Fuente</h2>
          <div className="space-y-4 mb-8">
            {news.sources.map((source) => (
              <div 
                key={source.id} 
                className="border border-gray-200 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-lg">{source.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${getBiasClass(source.politicalBias)}`}>
                    {source.politicalBias.replace('-', ' ')}
                  </span>
                </div>
                <h4 className="text-gray-900 font-medium mb-2">{source.title}</h4>
                <p className="text-gray-600 mb-3">{source.excerpt}</p>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                >
                  Leer artículo completo
                  <svg 
                    className="ml-1 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

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

export default NewsDetail;