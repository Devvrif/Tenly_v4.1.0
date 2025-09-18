import React from 'react';
import { useNews } from '../hooks/useNews';  // adjust path if needed

export const Home: React.FC = () => {
  const { news, loading, error } = useNews();

  return (
    <div>
      <h1>Today's Top Stories</h1>
      {loading && <p>Loading news...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {news.map((article, index) => (
            <li key={index} className="mb-4">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {article.title}
              </a>
              <p>{article.description}</p>
              <small>Source: {article.source.name} | Published: {new Date(article.publishedAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
