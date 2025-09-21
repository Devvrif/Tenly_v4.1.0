export interface Article {
  title: string;
  description: string;
  url: string;
  
  // NewsCard expects these (normalized from API):
  source_id: string;
  image_url: string | null;
  pubDate: string;
  link: string;
  
  // Modal expects these (from API response):
  image?: string;
  publishedAt?: string;
  source?: {
    name?: string;
  };
}

export interface Filters {
  country: string;
  language: string;
  category: string;
  query: string;
}