import axios from 'axios';
import { News, Source, PoliticalBias } from '../types';

// This would be in an environment variable in a real app
const API_KEY = 'pub_8126160a1ef34267a863d2dd3cb9f525369d6';
const BASE_URL = 'https://newsdata.io/api/1';

// Mock data for development purposes
const mockNews: News[] = [
  {
    id: '1',
    title: 'Presidente Boric anuncia nuevas medidas económicas',
    aiTitle: 'Government of Chile announces $5 billion economic plan',
    aiSummary: 'President Gabriel Boric announced an economic package that includes infrastructure investment, subsidies for small businesses, and social programs. The initiative aims to reactivate the economy after recent months of slowdown.',
    image: 'https://images.pexels.com/photos/8294609/pexels-photo-8294609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    topics: ['Economy', 'Politics'],
    people: ['Gabriel Boric', 'Mario Marcel'],
    sources: [
      {
        id: 's1',
        name: 'El Mercurio',
        title: 'Boric announces millionaire plan to boost economy',
        excerpt: 'The president announced measures worth $5 billion to stimulate economic growth.',
        url: '#',
        politicalBias: 'right',
      },
      {
        id: 's2',
        name: 'La Tercera',
        title: 'Government presents ambitious economic plan',
        excerpt: 'Gabriel Boric\'s administration presented a set of measures to stimulate the national economy.',
        url: '#',
        politicalBias: 'center-right',
      },
      {
        id: 's3',
        name: 'El Mostrador',
        title: 'Boric drives measures to reactivate economy',
        excerpt: 'The economic package includes infrastructure investments and SME support.',
        url: '#',
        politicalBias: 'center-left',
      },
      {
        id: 's4',
        name: 'BioBioChile',
        title: 'President announces plan to boost growth',
        excerpt: 'The measures seek to create employment and improve economic indicators.',
        url: '#',
        politicalBias: 'center',
      },
    ],
    publishedAt: '2023-11-20T14:30:00Z',
    region: 'Metropolitan',
    commune: 'Santiago',
  },
  {
    id: '2',
    title: 'Congreso aprueba reforma tributaria',
    aiTitle: 'Chile aprueba reforma tributaria tras meses de debate legislativo',
    aiSummary: 'El Congreso Nacional de Chile aprobó una controvertida reforma tributaria que aumenta los impuestos a los sectores de mayores ingresos y establece nuevos tributos para las empresas. La medida busca recaudar fondos para financiar programas sociales.',
    image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    topics: ['Economía', 'Política', 'Congreso'],
    people: ['Gabriel Boric', 'Ricardo Lagos'],
    sources: [
      {
        id: 's5',
        name: 'El Mercurio',
        title: 'Congreso aprueba polémica reforma tributaria',
        excerpt: 'La iniciativa ha sido criticada por sectores empresariales que advierten impactos negativos en la inversión.',
        url: '#',
        politicalBias: 'right',
      },
      {
        id: 's6',
        name: 'La Tercera',
        title: 'Reforma tributaria es aprobada en el Congreso',
        excerpt: 'Tras intenso debate, los parlamentarios dieron luz verde a la iniciativa del Ejecutivo.',
        url: '#',
        politicalBias: 'center-right',
      },
      {
        id: 's7',
        name: 'El Mostrador',
        title: 'Chile avanza en justicia tributaria con nueva reforma',
        excerpt: 'La medida permitirá una distribución más equitativa de la carga impositiva en el país.',
        url: '#',
        politicalBias: 'center-left',
      },
    ],
    publishedAt: '2023-11-15T10:15:00Z',
    region: 'Valparaíso',
    commune: 'Valparaíso',
  },
  {
    id: '3',
    title: 'Campeonato nacional de fútbol: Universidad de Chile lidera la tabla',
    aiTitle: 'Universidad de Chile se mantiene como líder del campeonato nacional de fútbol',
    aiSummary: 'El equipo azul continúa en la cima de la tabla de posiciones tras su victoria frente a Colo-Colo en el Estadio Monumental. El clásico del fútbol chileno estuvo marcado por la polémica tras un penal discutido en los minutos finales.',
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    topics: ['Deportes', 'Fútbol'],
    people: ['Marcelo Díaz', 'Carlos Palacios'],
    sources: [
      {
        id: 's8',
        name: 'La Tercera',
        title: 'La U se impone en el Superclásico y sigue como líder',
        excerpt: 'El conjunto universitario logró un importante triunfo que lo mantiene en lo más alto de la tabla.',
        url: '#',
        politicalBias: 'center-right',
      },
      {
        id: 's9',
        name: 'El Mercurio',
        title: 'Universidad de Chile triunfa en polémico clásico',
        excerpt: 'Un controvertido penal definió el partido más importante del fútbol chileno.',
        url: '#',
        politicalBias: 'right',
      },
      {
        id: 's10',
        name: 'BioBioChile',
        title: 'La U vence a Colo-Colo y se afirma en la punta',
        excerpt: 'El equipo azul sumó tres puntos vitales en su lucha por el título nacional.',
        url: '#',
        politicalBias: 'center',
      },
      {
        id: 's11',
        name: 'El Mostrador',
        title: 'El Romántico Viajero triunfa en el Monumental',
        excerpt: 'Universidad de Chile dio un golpe de autoridad al vencer a su archirrival en condición de visitante.',
        url: '#',
        politicalBias: 'center-left',
      },
    ],
    publishedAt: '2023-11-18T22:45:00Z',
    region: 'Metropolitana',
    commune: 'Macul',
  }
];

// Mock global news
const mockGlobalNews: News[] = [
  {
    id: 'g1',
    title: 'Major climate agreement reached at COP28',
    aiTitle: 'Global leaders agree on historic climate action plan at COP28',
    aiSummary: 'World leaders have reached a landmark agreement at COP28 to accelerate the transition to renewable energy and reduce global emissions by 50% by 2030.',
    image: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    topics: ['Climate Change', 'International Politics'],
    people: ['António Guterres', 'John Kerry'],
    sources: [
      {
        id: 'gs1',
        name: 'Reuters',
        title: 'Historic climate deal reached at COP28',
        excerpt: 'Global leaders agree to ambitious emission reduction targets.',
        url: '#',
        politicalBias: 'center',
      },
      {
        id: 'gs2',
        name: 'BBC',
        title: 'World agrees to unprecedented climate action',
        excerpt: 'Agreement marks turning point in global climate policy.',
        url: '#',
        politicalBias: 'center-left',
      },
    ],
    publishedAt: '2023-12-15T10:00:00Z',
    region: 'Global',
  },
];

// Mock discover content
const mockDiscoverContent: News[] = [
  {
    id: 'd1',
    title: 'The future of artificial intelligence in healthcare',
    aiTitle: 'How AI is revolutionizing medical diagnosis and treatment',
    aiSummary: 'An in-depth look at how artificial intelligence is transforming healthcare, from early disease detection to personalized treatment plans.',
    image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    topics: ['Technology', 'Healthcare', 'AI'],
    people: ['Dr. Sarah Chen', 'Prof. James Wilson'],
    sources: [
      {
        id: 'ds1',
        name: 'MIT Technology Review',
        title: 'AI: The future of healthcare',
        excerpt: 'How machine learning is changing medical practice.',
        url: '#',
        politicalBias: 'center',
      },
    ],
    publishedAt: '2023-12-14T08:00:00Z',
    region: 'Global',
  },
];

export const getNews = async (): Promise<News[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNews), 500);
  });
};

export const getGlobalNews = async (): Promise<News[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGlobalNews), 500);
  });
};

export const getDiscoverContent = async (): Promise<News[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDiscoverContent), 500);
  });
};

export const getNewsById = async (id: string): Promise<News | undefined> => {
  const allNews = [...mockNews, ...mockGlobalNews, ...mockDiscoverContent];
  return new Promise((resolve) => {
    setTimeout(() => resolve(allNews.find((news) => news.id === id)), 500);
  });
};

export const searchNews = async (query: string): Promise<News[]> => {
  const allNews = [...mockNews, ...mockGlobalNews, ...mockDiscoverContent];
  return new Promise((resolve) => {
    const results = allNews.filter(
      (news) => 
        news.aiTitle.toLowerCase().includes(query.toLowerCase()) || 
        news.aiSummary.toLowerCase().includes(query.toLowerCase()) ||
        news.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase())) ||
        news.people.some(person => person.toLowerCase().includes(query.toLowerCase()))
    );
    setTimeout(() => resolve(results), 500);
  });
};