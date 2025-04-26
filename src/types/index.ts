export interface News {
  id: string;
  title: string;
  aiTitle: string;
  aiSummary: string;
  image: string;
  topics: string[];
  people: string[];
  sources: Source[];
  publishedAt: string;
  region?: string;
  commune?: string;
}

export interface Source {
  id: string;
  name: string;
  title: string;
  excerpt: string;
  url: string;
  politicalBias: PoliticalBias;
}

export type PoliticalBias = 'left' | 'center-left' | 'center' | 'center-right' | 'right';

export interface BiasCoverage {
  leftCoverage: number;
  centerLeftCoverage: number;
  centerCoverage: number;
  centerRightCoverage: number;
  rightCoverage: number;
  totalSources: number;
}

export interface FavoritesList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  newsIds: string[];
}

export interface SavedNews {
  newsId: string;
  savedAt: string;
  listIds: string[];
}