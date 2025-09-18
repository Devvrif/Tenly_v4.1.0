import React from 'react';
import { useNews } from '../hooks/useNews';  // adjust path based on your folder structure

const NewsList = () => {
  const { news, loading, error } = useNews();

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Today's Top Stories</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
