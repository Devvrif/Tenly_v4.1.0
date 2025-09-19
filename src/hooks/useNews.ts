import React from 'react';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  image: string | null;
  publishedAt: string;
}

export const useNews = () => {
  const [news, setNews] = React.useState<NewsArticle[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('http://localhost:4000/api/news')  // ← CHANGE THIS LINE
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }
        return res.json();
      })
      .then(data => {
        setNews(data.articles);
        setLoading(false);
      })
      .catch(err => {
        setError(err?.message || 'An error occurred');
        setLoading(false);
      });
  }, []);

  return { news, loading, error };
};