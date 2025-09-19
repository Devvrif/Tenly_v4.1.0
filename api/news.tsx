import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the type for a single news article
interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
  image: string | null;
  publishedAt: string;
}

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]); // Define the state as an array of NewsArticle
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('technology'); // Default query
  const [category, setCategory] = useState('business'); // Default category
  const [country, setCountry] = useState('us'); // Default country
  const [language, setLanguage] = useState('en'); // Default language
  const [imageRequired, setImageRequired] = useState(true); // Filter for images

  // Fetch news based on query parameters
  useEffect(() => {
    setLoading(true);

    // Call backend API to fetch news with dynamic query
    axios
      .get(`/api/news`, {
        params: {
          query,
          category,
          country,
          language,
          imageRequired,
        },
      })
      .then((response) => {
        // The backend is returning the news inside `mediaStack`, not `articles`
        setNews(response.data.mediaStack); // Change here to get the correct data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, [query, category, country, language, imageRequired]);

  return (
    <div>
      <h1>Latest News</h1>

      {/* Input for query */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for news..."
      />

      {/* Category filter */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="politics">Politics</option>
        {/* More categories */}
      </select>

      {/* Country filter */}
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="us">US</option>
        <option value="gb">UK</option>
        <option value="in">India</option>
        {/* More countries */}
      </select>

      {/* Language filter */}
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
        {/* More languages */}
      </select>

      {/* Image filter */}
      <label>
        <input
          type="checkbox"
          checked={imageRequired}
          onChange={() => setImageRequired(!imageRequired)}
        />
        Show only articles with images
      </label>

      {/* Loading or news display */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {news.map((article, index) => (
            <li key={index}>
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
