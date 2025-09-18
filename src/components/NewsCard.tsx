// src/components/NewsCard.tsx
import React from 'react';

interface NewsArticle {
  urlToImage: string | null;
  title: string;
  source: { name: string };
  publishedAt: string;
  description: string;
  url: string;
}

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-500 mb-1">
          {article.source.name} &middot; {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-sm line-clamp-3">{article.description}</p>
      </div>
    </a>
  );
};
