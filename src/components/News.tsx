import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Type for each news article
interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  image: string | null;
  publishedAt: string;
}

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('technology');

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/news`, { params: { query } })
      .then((res) => {
        setNews(res.data.articles); // backend returns articles array
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div>
      <h1>Latest News</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {news.map((article, idx) => (
            <li key={idx}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              {article.image && <img src={article.image} alt={article.title} />}
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default News;
