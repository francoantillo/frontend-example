import React from 'react';

const FyP: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Para Ti</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-12 h-12 text-blue-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Personaliza tu experiencia de noticias
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-6">
            La sección "Para Ti" te mostrará noticias personalizadas basadas en tus intereses.
            Para empezar, selecciona tus temas y fuentes favoritas.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
            Configurar mis intereses
          </button>
        </div>
      </div>
    </div>
  );
};

export default FyP;