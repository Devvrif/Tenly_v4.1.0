import React from 'react';

export interface NewsArticle {
  urlToImage: string | null;
  title: string;
  source: { name: string };
  publishedAt: string;
  description: string;
  url: string;
}

// Define specific types for each API's data structure
interface NewsAPIArticle {
  urlToImage: string | null;
  title: string;
  source: { name: string };
  publishedAt: string;
  description: string;
  url: string;
}

interface MediastackArticle {
  image: string | null;
  title: string;
  source: string;
  published_at: string;
  description: string;
  url: string;
}

interface NewsDataIOArticle {
  image_url: string | null;
  title: string;
  source_id: string;
  published_at: string;
  description: string;
  url: string;
}

export const useNews = () => {
  const [news, setNews] = React.useState<NewsArticle[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('/api/news')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }
        return res.json();
      })
      .then(data => {
        const combinedNews: NewsArticle[] = [
          ...(data.articles || []).map((article: NewsAPIArticle) => ({
            ...article,
            urlToImage: article.urlToImage || 'default-image-url.jpg',
            source: article.source || { name: 'Unknown Source' },
          })),
          ...(data.data || []).map((article: MediastackArticle) => ({
            ...article,
            urlToImage: article.image || 'default-image-url.jpg',
            source: { name: article.source || 'Mediastack' },
          })),
          ...(data.results || []).map((article: NewsDataIOArticle) => ({
            ...article,
            urlToImage: article.image_url || 'default-image-url.jpg',
            source: { name: article.source_id || 'NewsData.io' },
          })),
        ];

        setNews(combinedNews);
        setLoading(false);
      })
      .catch(err => {
        setError(err?.message || 'An error occurred');
        setLoading(false);
      });
  }, []);

  return { news, loading, error };
};
