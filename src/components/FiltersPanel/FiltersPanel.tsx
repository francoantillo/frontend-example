import React, { useState } from 'react';

interface FiltersPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  region?: string;
  date?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  topics?: string[];
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    region: '',
    date: 'week',
    topics: [],
  });

  const regions = [
    'Todas las regiones',
    'Metropolitana',
    'Valparaíso',
    'Biobío',
    'La Araucanía',
    'Antofagasta',
    'Coquimbo',
    'O\'Higgins',
    'Maule',
    'Los Lagos',
    'Tarapacá',
    'Atacama',
    'Ñuble',
    'Los Ríos',
    'Arica y Parinacota',
    'Magallanes',
    'Aysén',
  ];

  const availableTopics = [
    'Política',
    'Economía',
    'Deportes',
    'Educación',
    'Salud',
    'Internacional',
    'Tecnología',
    'Cultura',
    'Medio Ambiente',
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleTopic = (topic: string) => {
    const currentTopics = filters.topics || [];
    if (currentTopics.includes(topic)) {
      handleFilterChange('topics', currentTopics.filter(t => t !== topic));
    } else {
      handleFilterChange('topics', [...currentTopics, topic]);
    }
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 font-medium text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <span>Filtros</span>
        <span className="text-blue-500">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Región
              </label>
              <select
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las regiones</option>
                {regions.slice(1).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <select
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="day">Último día</option>
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
                <option value="custom">Rango personalizado</option>
              </select>

              {filters.date === 'custom' && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Desde
                    </label>
                    <input
                      type="date"
                      value={filters.dateRange?.start || ''}
                      onChange={(e) =>
                        handleFilterChange('dateRange', {
                          ...filters.dateRange,
                          start: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Hasta
                    </label>
                    <input
                      type="date"
                      value={filters.dateRange?.end || ''}
                      onChange={(e) =>
                        handleFilterChange('dateRange', {
                          ...filters.dateRange,
                          end: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Topics */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temas
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`text-xs px-3 py-1 rounded-full transition-colors ${
                      filters.topics?.includes(topic)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setFilters({
                  region: '',
                  date: 'week',
                  topics: [],
                });
                onFilterChange({
                  region: '',
                  date: 'week',
                  topics: [],
                });
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;