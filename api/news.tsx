import React, { useState, useEffect } from 'react';

const NewsPage = () => {
  const [newsData, setNewsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch news from all sources (NewsAPI, MediaStack, NewsDataAPI)
    fetch('/api/news')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }
        return res.json();
      })
      .then((data) => {
        setNewsData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Today's Top Stories</h1>

      {/* News from NewsAPI */}
      <div>
        <h2>News from NewsAPI</h2>
        <ul>
          {newsData?.newsAPI?.articles?.map((article: any, index: number) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* News from MediaStack */}
      <div>
        <h2>News from MediaStack</h2>
        <ul>
          {newsData?.mediaStack?.data?.map((article: any, index: number) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* News from NewsDataAPI */}
      <div>
        <h2>News from NewsDataAPI</h2>
        <ul>
          {newsData?.newsDataAPI?.results?.map((article: any, index: number) => (
            <li key={index}>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsPage;
